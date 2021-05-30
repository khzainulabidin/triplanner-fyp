import {useState, useEffect, useRef} from "react";
import style from './Profile.module.css';
import BusinessLayout from "../../../components/BusinessLayout/BusinessLayout";
import CoverPhoto from "../../../components/CoverPhoto/CoverPhoto";
import ProfilePhoto from "../../../components/ProfilePhoto/ProfilePhoto";
import MyCard from "../../../components/MyCard/MyCard";
import StarIcon from '@material-ui/icons/Star';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import {Link, useHistory} from "react-router-dom";
import placeholder from '../../../assets/placeholder.png';
import NoUserWindow from "../../../components/NoUserWindow/NoUserWindow";
import {deleteAccount, myProfile} from "../../../utils/auth";
import MyModal from "../../../components/MyModal/MyModal";
import {getRating} from "../../../utils/misc";

const Profile = () => {
    const [coverPhoto, setCoverPhoto] = useState(placeholder);
    const [profilePhoto, setProfilePhoto] = useState(placeholder);
    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(false);
    const [deleteName, setDeleteName] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [rating, setRating] = useState(0);

    const history = useHistory();

    const handleDeleteAccount = () => {
        setIsLoading(true);
        const isDeleted = deleteAccount('business');
        setIsLoading(false);
        if (!isDeleted){
            return setError('Unable to delete your account at this time. Please try again.');
        }

        localStorage.clear();
        sessionStorage.clear();
        history.push('/');
    }

    const firstUpdate = useRef(true);
    useEffect(() => {
        if (firstUpdate.current){
            return firstUpdate.current = false;
        }

        getRating(user.userId).then(res => setRating(res)).catch(() => setRating(0));
    }, [user]);

    useEffect(() => {
        myProfile(setIsLoading, setUser, setProfilePhoto, setCoverPhoto);
        //eslint-disable-next-line
    }, []);

    return(
        <BusinessLayout isLoading={isLoading}>
            {isLoading ? null : user ? (
                <div style={{width: '100%'}}>
                    <MyModal open={open} setOpen={setOpen} actionText={'Delete my account'} action={handleDeleteAccount} disabled={user.name !== deleteName}>
                        <p className={style.error}>{error}</p>
                        Are you sure to want to permanently delete your account?
                        <p className={style.modalDesc}>This cannot be undone and all data including rooms, bookings and profile will be permanently deleted.</p>
                        <p className={style.modalDesc} style={{marginTop: '8%'}}>To continue, please enter your complete business name</p>
                        <input type={'text'} value={deleteName} onChange={e => setDeleteName(e.target.value)} placeholder={'Your business name'} className={style.modalInput}/>
                    </MyModal>

                    <CoverPhoto coverPhoto={coverPhoto} setCoverPhoto={setCoverPhoto} businessProfile/>
                    <ProfilePhoto profilePhoto={profilePhoto} setProfilePhoto={setProfilePhoto}/>

                    <div className={style.content}>
                        <MyCard>
                            <div style={{padding: '3% 5%'}}>
                                <p className={style.name}>
                                    <span>{user.name}</span>
                                    <span className={style.rating}><StarIcon/> {rating}</span>
                                </p>
                                <p>A {user.starRating} star hotel located in {user.city}</p>

                                <div className={style.contactInfo}>
                                    <HomeWorkIcon style={{color: '#7D7D7D'}}/>
                                    <p>
                                        {user.address}<br/>
                                        {user.city}<br/>
                                        {user.zipCode}
                                    </p>
                                </div>

                                <div className={style.contactInfo}>
                                    <PhoneAndroidIcon style={{color: '#7D7D7D'}}/>
                                    <p>{user.phone}</p>
                                </div>
                            </div>
                        </MyCard>

                        <MyCard style={{height: '45%'}}>
                            <div className={style.links}>
                                <Link to={'/business/createProfile'}>Edit profile</Link>
                                <Link to={'/business/profile'} onClick={() => setOpen(true)} style={{color: '#DD5145'}}>Delete your account</Link>
                            </div>
                        </MyCard>
                    </div>
                </div>) : <div className={'noUserContainer'}><NoUserWindow/></div>
            }
        </BusinessLayout>
    );
}

export default Profile;
