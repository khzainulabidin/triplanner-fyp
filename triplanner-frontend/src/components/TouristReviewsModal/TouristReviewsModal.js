import React, {Fragment, useState} from "react";
import MyModal from "../MyModal/MyModal";
import styles from '../BookingModal/BookingModal.module.css';
import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";
import axios from "axios";
import {REVIEWS_ROUTE} from "../../utils/routes";

const TouristReviewsModal = ({review}) => {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');

    const deleteReview = async () => {
        const res = await axios.delete(`${REVIEWS_ROUTE}/${review.itemId}`, {headers: {'x-access-token': localStorage.getItem('token')}});
        const data = res.data;
        if (!data.success){
            return setError('Unable to delete review');
        }

        setError('');
        setOpen(false);
        window.location.reload();
    }

    return(
        <Fragment>
            <p onClick={() => setOpen(true)} style={{color: '#04B6A9', cursor: "pointer"}}>View</p>
            <MyModal open={open} setOpen={setOpen}
                     actionText={'Delete Review'}
                     action={deleteReview}
            >
                <div className={styles.modal}>
                    <p style={{color: '#DD5347', marginBottom: '2%'}}>{error}</p>
                    <h4 style={{fontSize: '1.3rem', fontWeight: '300', marginBottom: '5%'}}><b>{review.name}</b></h4>
                    <Rating
                        value={review.rating}
                        precision={0.5}
                        icon={<FavoriteIcon style={{fontSize: '20px'}} />}
                        readOnly
                    />
                    <p style={{marginTop: '2%'}}>{review.review}</p>
                </div>
            </MyModal>
        </Fragment>
    );
}

export default TouristReviewsModal;
