import React from "react";
import styles from './SimpleReview.module.css';
import {Avatar} from "@material-ui/core";

const SimpleReview = ({avatarSrc, review}) => {
    return(
        <div className={styles.simpleReview}>
            <Avatar alt="Person" src={avatarSrc}/>
            <p>{review}</p>
        </div>
    );
};

export default SimpleReview;