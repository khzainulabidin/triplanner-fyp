import style from './CreateProfileLayout.module.css';
import React, {Fragment} from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import CoverPhoto from "../CoverPhoto/CoverPhoto";
import ProfilePhoto from "../ProfilePhoto/ProfilePhoto";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const CreateProfileLayout = ({coverPhoto, setCoverPhoto, profilePhoto, setProfilePhoto, error, updateProfile, isLoading, children}) => {
    return(
        <Fragment>
            <LoadingSpinner isLoading={isLoading}/>
            <div className={style.createProfile}>
                <CoverPhoto coverPhoto={coverPhoto} setCoverPhoto={setCoverPhoto} clickable/>
                <ProfilePhoto profilePhoto={profilePhoto} setProfilePhoto={setProfilePhoto} clickable/>

                <div className={style.content}>
                    <div>
                        <p className={style.error}>{error}</p>
                        {children}
                    </div>
                    <div className={style.buttonArea}>
                        <button type={'button'} onClick={updateProfile}>
                            <ChevronRightIcon fontSize={"large"}/>
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default CreateProfileLayout;