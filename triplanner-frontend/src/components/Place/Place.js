import React, {useEffect, useState} from "react";
import styles from './Place.module.css';
import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Zoom from "react-reveal/Zoom";
import {useDispatch} from "react-redux";
import {setPlace} from "../../redux/slices/explore/nearbyPlaces";
import {useHistory} from "react-router-dom";

const Place = ({width, place}) => {
    const [img, setImg] = useState('');

    const dispatch = useDispatch();
    const history = useHistory();

    const handleClick = () => {
        dispatch(setPlace(place));
        window.scrollTo(0, 0);
        history.push('/placeDetail');
    };

    useEffect(() => {
        if (place.photos){
            setImg(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=${place.photos[0].photo_reference}&key=AIzaSyB832KgMGQLbv1FxFvsQVi3GQJfs__LQMc`);
        }
        else {
            handleError();
        }
    }, [place]);

    const handleError = () => {
        setImg('http://localhost:5000/images/image_placeholder.jpg');
    }

    return(
        <div className={styles.Place} style={{width: `${width}%`}} onClick={handleClick}>
            <Zoom>
                <img
                    src={img}
                    alt={place.name}
                    onError={handleError}
                />
                <div className={styles.Place_infoContainer}>
                    <h3>{place.name}</h3>
                    {place.user_ratings_total > 0 ? (
                        <div className={styles.Place_ratingContainer}>
                            <Rating
                                value={place.rating}
                                precision={0.5}
                                icon={<FavoriteIcon style={{fontSize: '10px'}} />}
                                readOnly
                            />
                            <p style={{marginLeft: '5px'}}>{place.user_ratings_total} reviews</p>
                        </div>
                    ) : <p>No reviews yet</p>}
                    <p className={'Place_type'}>{place.types[0].split('_').join(' ')}</p>
                    <p>{place.vicinity}</p>
                </div>
            </Zoom>
        </div>
    );
}

export default Place;