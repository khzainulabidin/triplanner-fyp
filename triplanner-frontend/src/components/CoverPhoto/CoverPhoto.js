import style from './CoverPhoto.module.css';
import React, {Fragment, useRef} from "react";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import {getSrc, handlePhotoClick} from "../../utils/misc";
import BusinessIcon from '@material-ui/icons/Business';

const CoverPhoto = ({coverPhoto, setCoverPhoto, clickable, businessProfile}) => {
    const coverPhotoInputRef = useRef(null);
    const cursorStyle = clickable ? 'pointer' : 'default';
    const borderRadius = clickable ? 0 : '20px';
    const justifyContent = clickable ? 'center' : 'flex-start';

    return(
        <div
            className={style.coverPhoto}
            style={{cursor: cursorStyle, borderRadius: borderRadius, justifyContent: justifyContent}}
            onClick={() => handlePhotoClick(clickable, coverPhotoInputRef)}
        >
            {!clickable && businessProfile && <div className={style.businessBadge}><BusinessIcon style={{marginRight: '3%'}}/> Business Profile</div>}
            {coverPhoto ? (
                <img style={{borderRadius: borderRadius}} src={getSrc(coverPhoto, clickable)} alt={coverPhoto ? coverPhoto.name : null}/>
            ) : (
                <Fragment>
                    <PhotoCameraIcon/>
                    <p>Set cover photo</p>
                </Fragment>
            )}
            {clickable && <input style={{display: 'none'}} accept={'.jpg, .png'} type={'file'} ref={coverPhotoInputRef} onChange={e => setCoverPhoto(e.target.files[0])}/>}
        </div>
    );
};

export default CoverPhoto;