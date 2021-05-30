import React, {useEffect, useState} from "react";
import styles from './Place.module.css';
import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";
import {Fade} from 'react-reveal';
import placeholder from '../../assets/placeholder.png';
import {getPlacePhoto, getRating, openPlaceDetail} from "../../utils/misc";

const Place = ({width, place, selectable, onSelect, selected, parentId}) => {
    const [photo, setPhoto] = useState(placeholder);
    const [isLoading, setIsLoading] = useState(true);
    const [rating, setRating] = useState(0);

    useEffect(() => {
        getRating(place.place_id).then(res => setRating(res)).catch(() => setRating(0));
    }, [place]);

    useEffect(() => {
        if (place.photos !== undefined && place.photos !== null){
            setIsLoading(true);
            getPlacePhoto(setPhoto, place.photos[0].photo_reference).then(() => {
                setIsLoading(false);
            }).catch(() => {
                setIsLoading(false);
            });
        }
        else {
            setPhoto(placeholder);
        }
        //eslint-disable-next-line
    }, [place]);

    return(
        isLoading ? null : (
            <div
                className={styles.Place}
                style={selected ? {width: `${width}%`, border: '3px solid #04B6A9'} : {width: `${width}%`}}
                onClick={selectable ? () => onSelect({
                    parent: parentId,
                    id: place.place_id,
                    name: place.name,
                    type: place.types[0].split('_').join(' '),
                }) : () => openPlaceDetail(place.place_id)}
            >
                <Fade>
                    <img
                        src={photo}
                        alt={place.name}
                    />
                    <div className={styles.Place_infoContainer}>
                        <p className={'Place_type'}>{place.types[0].split('_').join(' ')}</p>
                        <h3>{place.name}</h3>

                        <div className={styles.Place_ratingContainer}>
                            {!rating || rating === 0 ? <p style={{fontSize: '0.7rem'}}>No reviews yet</p> : (
                                <Rating
                                    value={rating}
                                    precision={0.5}
                                    icon={<FavoriteIcon style={{fontSize: '10px'}} />}
                                    readOnly
                                />
                            )}
                        </div>
                        <p>{place.vicinity}</p>
                    </div>
                </Fade>
            </div>
        )
    );
}

export default Place;
