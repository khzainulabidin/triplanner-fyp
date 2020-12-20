import React, {useState} from "react";
import styles from "../Reviews/Reviews.module.css";
import ComplexReview from "../Reviews/ComplexReview/ComplexReview";
import SliderPrevButton from "../SliderPrevButton/SliderPrevButton";
import SliderNextButton from "../SliderNextButton/SliderNextButton";
import av3 from "../../assets/av3.png";

const ReviewsBox = () => {
    const [startingIndex, setStartingIndex] = useState(0);
    const [endingIndex, setEndingIndex] = useState(4);

    const reviews = [
        {
            avatar: av3,
            review: 'Sheets containing Lorem Ipsum passages, and more recently with desktop',
            date: 'November 12, 2020',
            agrees: 56,
            rating: 5,
        },
        {
            avatar: av3,
            review: 'Sheets containing Lorem Ipsum passages, and more recently with desktop',
            date: 'November 12, 2020',
            agrees: 56,
            rating: 5,
        },
        {
            avatar: av3,
            review: 'Sheets containing Lorem Ipsum passages, and more recently with desktop',
            date: 'November 12, 2020',
            agrees: 56,
            rating: 5,
        },
        {
            avatar: av3,
            review: 'Sheets containing Lorem Ipsum passages, and more recently with desktop',
            date: 'November 12, 2020',
            agrees: 56,
            rating: 5,
        },
        {
            avatar: av3,
            review: 'Sheets containing Lorem Ipsum passages, and more recently with desktop',
            date: 'November 12, 2020',
            agrees: 56,
            rating: 5,
        },
        {
            avatar: av3,
            review: 'Sheets containing Lorem Ipsum passages, and more recently with desktop',
            date: 'November 12, 2020',
            agrees: 56,
            rating: 5,
        },
        {
            avatar: av3,
            review: 'Sheets containing Lorem Ipsum passages, and more recently with desktop',
            date: 'November 12, 2020',
            agrees: 56,
            rating: 5,
        },
        {
            avatar: av3,
            review: 'Sheets containing Lorem Ipsum passages, and more recently with desktop',
            date: 'November 12, 2020',
            agrees: 56,
            rating: 5,
        },
        {
            avatar: av3,
            review: 'Sheets containing Lorem Ipsum passages, and more recently with desktop',
            date: 'November 12, 2020',
            agrees: 56,
            rating: 5,
        },
    ];

    return(
        <div className={styles.content_box}>
            <div className={styles.reviews_box}>
                {reviews.slice(startingIndex, endingIndex).map((review, index) => (
                    <ComplexReview
                        key={index}
                        avatarSrc={review.avatar}
                        review={review.review}
                        rating={review.rating}
                        agrees={review.agrees}
                        date={review.date}
                    />
                ))}
            </div>

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
        </div>
    );
};

export default ReviewsBox;