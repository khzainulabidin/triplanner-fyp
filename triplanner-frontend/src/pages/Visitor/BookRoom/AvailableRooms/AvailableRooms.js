import styles from './AvailableRooms.module.css';
import NavBar from "../../../../components/NavBar/NavBar";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";
import React, {useEffect, useState, Fragment} from "react";
import RoomCard from "../../../../components/RoomCard/RoomCard";
import MyAccordion from "../../../../components/MyAccordion/MyAccordion";
import DoneIcon from '@material-ui/icons/Done';
import Reviews from "../../../../components/Reviews/Reviews";
import Footer from "../../../../components/Footer/Footer";
import ContactForm from "../../../../components/ContactForm/ContactForm";
import {useParams} from "react-router-dom";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import ErrorPageLayout from "../../../../components/ErrorPageLayout/ErrorPageLayout";
import GalleryPhoto from "../../../../components/GalleryPhoto/GalleryPhoto";
import {getOtherProfile} from "../../../../utils/auth";
import axios from "axios";
import {RATING_ROUTE} from "../../../../utils/routes";
import {Fade} from 'react-reveal';

const AvailableRooms = () => {
    const [cover, setCover] = useState('');
    const [profilePhoto, setProfilePhoto] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [profile, setProfile] = useState({});
    const [rating, setRating] = useState(0);
    const params = useParams();
    const {hotelId, checkIn, checkOut} = params;

    const fetchRating = async () => {
        const res = await axios.get(`${RATING_ROUTE}/${hotelId}`);
        const data = res.data;
        if (!data.success){
            setRating(0);
        }
        setRating(Number(data.data));
    }

    const fetchProfile = () => {
        setIsLoading(true);
        getOtherProfile(hotelId).then(user => {
            if (!user){
                return setError('Unable to fetch hotel profile');
            }

            setProfilePhoto(`http://localhost:5000/${user.avatar}`);
            setCover(`http://localhost:5000/${user.cover.replace('\\', '/')}`);
            setProfile(user);
            setIsLoading(false);
        });
    }

    useEffect(() => {
        fetchProfile();
        fetchRating().catch(() => setRating(0));
        //eslint-disable-next-line
    }, [])

    return(
        <Fragment>
            <LoadingSpinner isLoading={isLoading}/>
            {!isLoading && !error && profile && <Fade><div className={styles.availableRooms}>
                <NavBar/>
                <div style={{
                    background: `url('${cover}')`,
                    backgroundSize: 'cover',
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: 'fixed'
                }}>
                    <div className={styles.overlay}>
                        <div>
                            <p className={styles.name}>{profile.name}</p>
                            <p className={styles.desc}>A {profile.starRating} star hotel located in {profile.city}</p>

                            <div className={styles.rating}>
                                {rating && rating > 0.4 ? <Rating
                                    value={Number(rating)}
                                    precision={0.5}
                                    icon={<FavoriteIcon style={{fontSize: '15px'}}/>}
                                    readOnly
                                /> : <p style={{fontSize: '0.9rem'}}>No reviews yet</p>}
                            </div>

                            <div className={styles.address}>
                                <HomeWorkIcon style={{color: '#FBFBFB'}}/>
                                <div>
                                    <p>{profile.address}</p>
                                    <p>{profile.city}</p>
                                    <p>{profile.zipCode}</p>
                                </div>
                            </div>

                            <div className={styles.address}>
                                <PhoneAndroidIcon style={{color: '#FBFBFB'}}/>
                                <div>
                                    <a href={'tel:+13473579720'}>{profile.phone}</a>
                                </div>
                            </div>
                        </div>

                        <img src={profilePhoto} className={styles.profilePhoto} alt={'Hotel Profile'}/>
                    </div>
                </div>

                <div className={styles.content}>
                    {profile && profile.facilities && <MyAccordion
                        heading={'Facilities'}
                        content={
                            <div className={styles.facilities}>
                                {profile.facilities.map((facility, index) => (
                                    <div key={index}>
                                        <DoneIcon color={'secondary'}/>
                                        <span style={{textTransform: 'capitalize'}}>{facility}</span>
                                    </div>
                                ))}
                            </div>
                        }
                    />}

                    {profile && profile.roomGallery && <MyAccordion
                        heading={'Gallery'}
                        content={
                            <div className={styles.gallery}>
                                {profile.roomGallery.length < 1 ?
                                    <p>No photos available</p> : profile.roomGallery.map((photo, index) => (
                                        <GalleryPhoto photo={photo} key={index}/>
                                    ))}
                            </div>
                        }
                    />}

                    {profile && profile.rooms && <Fragment>
                        <p className={styles.availableTitle}>Available room types</p>
                        {profile.rooms.length > 0 && profile.rooms.filter(room => room.number_of_rooms > 0).length > 0 ?
                            <div className={styles.rooms}>
                                {profile.rooms.filter(room => room.number_of_rooms > 0).map((room, index) => (
                                    <RoomCard key={index} room={room} readOnly={true}
                                              selectRoomLink={`/bookingPayment/${room.type}/${checkIn}/${checkOut}/${hotelId}`}/>
                                ))}
                            </div> : <span>All rooms are occupied at this moment</span>}
                    </Fragment>}
                </div>

                <Reviews bg={cover} itemId={hotelId} name={profile.name}/>
                {Boolean(profile.messaging) && <ContactForm hotelId={hotelId} hotelName={profile.name}/>}

                <Footer/>
            </div></Fade>}
            {error && <ErrorPageLayout text={error}/>}
            {!isLoading && !profile && !error && <ErrorPageLayout text={'Unable to fetch hotel profile. Try reloading the page'}/>}
        </Fragment>
    );
}

export default AvailableRooms;
