import style from './ProfilePhoto.module.css';
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import React, {useRef} from "react";
import {getSrc, handlePhotoClick} from "../../utils/misc";

const ProfilePhoto = ({profilePhoto, setProfilePhoto, clickable}) => {
    const profilePhotoInputRef = useRef(null);
    const cursorStyle = clickable ? 'pointer' : 'default';

    return(
        <div className={style.profilePhoto} style={{cursor: cursorStyle}} onClick={() => handlePhotoClick(clickable, profilePhotoInputRef)}>
            {profilePhoto ? (
                <img src={getSrc(profilePhoto, clickable)} alt={profilePhoto ? profilePhoto.name : null}/>
            ) : (
                <PhotoCameraIcon fontSize={"large"}/>
            )}
            {clickable ? (<input style={{display: 'none'}} accept={'.jpg, .png'} type={'file'} ref={profilePhotoInputRef} onChange={e => setProfilePhoto(e.target.files[0])}/>) : null}
        </div>
    );
}

export default ProfilePhoto;