import React, {useState, Fragment} from "react";
import styles from "../Reviews/Reviews.module.css";
import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MyModal from "../MyModal/MyModal";
import axios from "axios";
import {REVIEWS_ROUTE} from "../../utils/routes";

const ReviewsBoxOptions = ({itemId, name}) => {
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(5);
    const [review, setReview] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('')

    const submitReview = () => {
        setIsLoading(true);
        axios.post(REVIEWS_ROUTE, {itemId, rating, review, name}, {headers: {
            'x-access-token': localStorage.getItem('token')
        }}).then(res => {
            setIsLoading(false);
            const data = res.data;
            if (!data.success){
                return setError(data.data);
            }

            setRating(5);
            setReview('');
            setError('');
            setOpen(false);
            window.location.reload();
        })
    }

    return(
        <Fragment>
            <button className={styles.reviews_addBtn} onClick={() => setOpen(true)}>Add Review</button>

            <MyModal open={open} setOpen={setOpen} actionText={'Submit'} action={submitReview} disabled={review.length === 0 || isLoading}>
                <Fragment>
                    <p className={styles.modalTitle}>Add a review</p>
                    <p className={styles.error}>{error}</p>
                    <Rating
                        value={rating}
                        onChange={(e, value) => setRating(Number(value))}
                        precision={0.5}
                        icon={<FavoriteIcon style={{ fontSize: '20px'}} />}
                        name={'rating'}
                    />
                    <form>
                        <textarea
                            rows={5}
                            placeholder={'Write review'}
                            className={styles.reviewBox}
                            value={review}
                            onChange={e => setReview(e.target.value)}
                        >
                        </textarea>
                    </form>
                </Fragment>
            </MyModal>
        </Fragment>
    );
};

export default ReviewsBoxOptions;
