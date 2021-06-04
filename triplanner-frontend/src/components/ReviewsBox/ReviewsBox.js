import React, {useState, useEffect} from "react";
import styles from "../Reviews/Reviews.module.css";
import ComplexReview from "../Reviews/ComplexReview/ComplexReview";
import SliderPrevButton from "../SliderPrevButton/SliderPrevButton";
import SliderNextButton from "../SliderNextButton/SliderNextButton";
import axios from "axios";
import {REVIEWS_ROUTE} from "../../utils/routes";

const ReviewsBox = ({itemId}) => {
    const [startingIndex, setStartingIndex] = useState(0);
    const [endingIndex, setEndingIndex] = useState(4);
    const [reviews, setReviews] = useState([]);

    const getReviews = () => {
        axios.get(`${REVIEWS_ROUTE}/${itemId}`).then(res => {
            const data = res.data;
            if (!data.success){
                return setReviews([]);
            }

            setReviews(data.data);
        }).catch(() => setReviews([]));
    }

    useEffect(() => {
        getReviews();
        //eslint-disable-next-line
    }, []);

    return(
        <div className={styles.content_box}>
            <div className={styles.reviews_box}>
                {reviews.length < 1 ?
                    <p className={styles.noReviews}>No one has reviewed this place on TriPlanner yet</p>
                    : reviews.slice(startingIndex, endingIndex).map((review, index) => (
                    <ComplexReview
                        key={index}
                        userId={review.userId}
                        review={review.review}
                        rating={review.rating}
                        date={review.reviewedAt}
                    />
                ))}
            </div>

            {reviews.length <= 4 ? null : (
                <div className={styles.btnContainer}>
                    <SliderPrevButton
                        startingIndex={startingIndex}
                        endingIndex={endingIndex}
                        setStartingIndex={setStartingIndex}
                        setEndingIndex={setEndingIndex}
                        count={4}
                    />

                    <SliderNextButton
                        startingIndex={startingIndex}
                        endingIndex={endingIndex}
                        setStartingIndex={setStartingIndex}
                        setEndingIndex={setEndingIndex}
                        count={4}
                        length={reviews.length}
                    />
                </div>
            )}
        </div>
    );
};

export default ReviewsBox;
