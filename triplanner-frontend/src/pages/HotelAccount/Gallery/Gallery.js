import styles from './Gallery.module.css';
import BusinessLayout from "../../../components/BusinessLayout/BusinessLayout";
import React, {Fragment, useEffect, useRef, useState} from "react";
import NoUserWindow from "../../../components/NoUserWindow/NoUserWindow";
import {getMe} from "../../../utils/auth";
import AddIcon from '@material-ui/icons/Add';
import MyCard from "../../../components/MyCard/MyCard";
import {uploadSingleFile} from "../../../utils/misc";
import GalleryPhoto from "../../../components/GalleryPhoto/GalleryPhoto";
import axios from "axios";
import {BUSINESS_DELETE_GALLERY_PHOTO} from "../../../utils/routes";
import {Fade} from "react-reveal";

const Gallery = () => {
    const roomPhotoRef = useRef(null);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [photos, setPhotos] = useState([]);

    const deletePhoto = (photo) => {
        setIsLoading(true);
        axios.post(BUSINESS_DELETE_GALLERY_PHOTO, {photo}, {headers: {
                'x-access-token': localStorage.getItem('token')
        }}).then(res => {
            const data = res.data;
            if (!data.success){
                return setError('Unable to delete photo');
            }
            setPhotos(data.data);
            setIsLoading(false);
        }).catch(() => {
            setIsLoading(false);
            setError('Unable to delete photo');
        })
    }

    const uploadRoomPhoto = async (photo) => {
        setIsLoading(true);
        const isPhotoUploaded = await uploadSingleFile(photo, 'roomGallery');
        setIsLoading(false);
        setError('');
        if (!isPhotoUploaded){
            return setError('Unable to upload photo');
        }
        window.location.reload();
    }

    const fetchUser = () => {
        setIsLoading(true);
        getMe().then(user => {
            setIsLoading(false);
            setUser(user);
            setPhotos(user.roomGallery.reverse());
        }).catch(() => {
            setIsLoading(false);
            setUser(null);
        });
    }

    useEffect(() => {
        fetchUser();
        //eslint-disable-next-line
    }, []);

    return(
        <BusinessLayout isLoading={isLoading}>
            {isLoading ? null : user ? (
                <Fragment>
                    <div style={{width: '100%'}}>
                        <Fade>
                            <MyCard>
                                <h4 className={styles.title}>Gallery</h4>
                                <p className={styles.desc}>You can upload a maximum of 14 photos</p>
                            </MyCard>

                            {error && <MyCard>
                                <p className={styles.desc} style={{color: '#DD5347', margin: '0 3%'}}>{error}</p>
                            </MyCard>}

                            <div className={styles.gallery}>
                                {photos.length < 14 && <button onClick={() => roomPhotoRef.current.click()}>
                                    <AddIcon fontSize={'large'}/>
                                    <span>Add Photo</span>
                                </button>}

                                {photos.map((photo, index) => (
                                    <GalleryPhoto photo={photo} key={index} deletePhoto={deletePhoto}/>
                                ))}
                            </div>
                        </Fade>
                    </div>
                    <input type={'file'} style={{display: "none"}} accept={'.jpg, .png'} ref={roomPhotoRef} onChange={e => uploadRoomPhoto(e.target.files[0])}/>
                </Fragment>) : <div className={'noUserContainer'}><NoUserWindow/></div>}
        </BusinessLayout>
    );
}

export default Gallery;
