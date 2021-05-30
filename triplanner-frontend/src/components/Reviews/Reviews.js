import React, {useState, useEffect} from "react";
import styles from './Reviews.module.css';
import ReviewsBox from "../ReviewsBox/ReviewsBox";
import ReviewsBoxOptions from "../ReviewsBox/ReviewsBoxOptions";
import {isAuthenticated} from "../../utils/auth";

const Reviews = ({bg, itemId, name}) => {
    const [authenticated, setAuthenticated] = useState(false);

    const authenticate = async () => {
        try {
            const res = await isAuthenticated('tourist');
            setAuthenticated(res);
        }
        catch (e){
            setAuthenticated(false);
        }
    }

    useEffect(() => {
        authenticate().catch(() => setAuthenticated(false));
    }, []);

    return(
        <div className={styles.reviews} style={{backgroundImage: `url(${bg})`}}>
            <div className={styles.reviews_container}>
                <div className={styles.reviews_header}>
                    <h1>Reviews & Rating</h1>
                    {authenticated ? <ReviewsBoxOptions itemId={itemId} name={name}/> : null}
                </div>
                <ReviewsBox itemId={itemId}/>
            </div>
        </div>
    );
};

export default Reviews;
