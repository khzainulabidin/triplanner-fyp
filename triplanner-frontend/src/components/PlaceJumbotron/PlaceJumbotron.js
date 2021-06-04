import React, {Fragment} from "react";
import styles from './PlaceJumbotron.module.css';
import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";
import JumboImage from "../JumboImage/JumboImage";

const PlaceJumbotron = ({title, type, address, rating, image, phone}) => {

    return(
        <div className={styles.placeJumbotron}>
            <div className={styles.placeJumbotron_overlay}>
                <div className={styles.placeJumbotron_box}>
                    <div className={styles.placeJumbotron_infoContainer}>
                        <h1 className={'Place_type'}>{title}</h1>
                        <p className={'Place_type'}>{type}</p>
                        <p style={{marginTop: '8%', fontStyle: 'italic'}}>{address}</p>
                        <a href={`tel:${phone}`} style={{fontSize: '90%', marginTop: '3%'}}>{phone}</a>

                        <div className={styles.placeJumbotron_ratingContainer}>
                            {!rating || rating === 0 ? <p>No reviews yet</p> : (
                                <Fragment>
                                    <Rating
                                        value={rating}
                                        precision={0.5}
                                        icon={<FavoriteIcon style={{fontSize: '20px'}} />}
                                        readOnly
                                    />
                                    <p>{rating}/5.0</p>
                                </Fragment>
                            )}
                        </div>
                    </div>

                    <JumboImage image={image}/>
                </div>
            </div>
        </div>
    );
};

export default PlaceJumbotron;
