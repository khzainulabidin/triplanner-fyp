import React from "react";
import styles from './PlaceJumbotron.module.css';
import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";
import {Link} from "react-router-dom";
import SimpleReview from "../Reviews/SimpleReview/SimpleReview";
import JumboImage from "../JumboImage/JumboImage";

const PlaceJumbotron = ({title, type, address, rating, reviewsCount, reviews, image}) => {

    return(
        <div className={styles.placeJumbotron}>
            <div className={styles.placeJumbotron_overlay}>
                <div className={styles.placeJumbotron_box}>
                    <div className={styles.placeJumbotron_infoContainer}>
                        <h1 className={'Place_type'}>{title}</h1>
                        <p className={'Place_type'}>{type}</p>
                        <p>{address}</p>
                        <Link to={'/'}>View directions</Link>

                        {reviewsCount > 0 ? (
                            <div className={styles.placeJumbotron_ratingContainer}>
                                <Rating
                                    value={rating}
                                    precision={0.5}
                                    icon={<FavoriteIcon />}
                                    size={'small'}
                                    readOnly
                                />
                                <Link to={'/'}>{reviewsCount} reviews</Link>
                            </div>
                        ) : <p style={{margin: '8% 0', fontSize: '1rem'}}>No reviews yet</p>}

                        <div className={styles.placeJumbotron_reviewsContainer}>
                            {reviews.slice(0, 2).map((review, index) => (
                                <SimpleReview
                                    key={index}
                                    avatarSrc={review.avatar}
                                    review={review.review}
                                />
                            ))}
                        </div>

                        {/*<Link to={'/'}>Things to do near <span className={'Place_type'}>{title}</span></Link>*/}
                    </div>

                    <JumboImage image={image}/>
                </div>
            </div>
        </div>
    );
};

export default PlaceJumbotron;