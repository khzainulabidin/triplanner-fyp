import styles from "./ProfileCard.module.css";
import {Link} from "react-router-dom";
import React from "react";
import {Zoom} from "react-reveal";

const ProfileCard = ({user, margin}) => {
    return(
        <Zoom>
            <div className={styles.profileCard}>
                <img src={`${process.env.REACT_APP_API_BASE_URL}/${user.cover}`} alt={'User cover'} className={styles.cover}/>
                <img src={`${process.env.REACT_APP_API_BASE_URL}/${user.avatar}`} alt={'User cover'} className={styles.avatar}/>

                <div className={styles.info} style={margin ? {marginLeft: margin} : {}}>
                    <p className={styles.name}>{user.name}</p>
                    <p className={styles.username}>@{user.username}</p>
                    <p className={styles.city}>Lives in {user.city}</p>
                </div>
                <Link className={styles.viewProfile} to={`/profile/${user.username}`}>View Profile</Link>
            </div>
        </Zoom>
    );
}

export default ProfileCard;
