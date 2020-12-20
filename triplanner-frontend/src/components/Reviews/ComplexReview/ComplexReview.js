import React from "react";
import {Avatar} from "@material-ui/core";
import styles from './ComplexReview.module.css';
import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';

const ComplexReview = ({avatarSrc, review, rating, date, agrees}) => {
    return(
        <div className={styles.ComplexReview}>
            <div className={styles.ComplexReview_avatar}>
                <Avatar alt="Person" src={avatarSrc}/>
            </div>

            <div className={styles.ComplexReview_container}>
                <div className={styles.ComplexReview_ratingContainer}>
                    <Rating
                        value={rating}
                        precision={0.5}
                        icon={<FavoriteIcon style={{color: '#FBFBFB', fontSize: '10px'}} />}
                        readOnly
                    />
                    <p>{date}</p>
                </div>

                <p>{review}</p>

                <div className={styles.ComplexReview_btnContainer}>
                    <button>
                        <CheckOutlinedIcon style={{fontSize: '0.7rem'}}/> agree
                    </button>
                    <p> - {agrees}</p>
                </div>
            </div>
        </div>
    );
};

export default ComplexReview;