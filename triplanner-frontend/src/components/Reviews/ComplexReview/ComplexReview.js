import React, {useEffect, useState} from "react";
import {Avatar} from "@material-ui/core";
import styles from './ComplexReview.module.css';
import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";
import {getOtherProfile} from "../../../utils/auth";

const ComplexReview = ({userId, review, rating, date}) => {
    const [avatar, setAvatar] = useState(null);
    const [username, setUsername] = useState('');
    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        getOtherProfile(userId).then(user => {
            setAvatar(`${process.env.REACT_APP_API_BASE_URL}/${user.avatar}`);
            setUsername(user.username)
        });

        const jsDate = new Date(date);
        setFormattedDate(`${jsDate.getMonth()+1}/${jsDate.getDate()}/${jsDate.getFullYear()}`);

        //eslint-disable-next-line
    }, [])

    return(
        <div className={styles.ComplexReview}>
            <div className={styles.ComplexReview_avatar}>
                <Avatar src={avatar}/>
            </div>

            <div className={styles.ComplexReview_container}>
                <div className={styles.ComplexReview_ratingContainer}>
                    <Rating
                        value={rating}
                        precision={0.5}
                        icon={<FavoriteIcon style={{fontSize: '13px'}} />}
                        readOnly
                    />
                    <p>Reviewed by {username} on {formattedDate}</p>
                </div>

                <p>{review}</p>
            </div>
        </div>
    );
};

export default ComplexReview;
