import React, {useEffect, useState, Fragment, useRef} from "react";
import Fade from 'react-reveal/Fade';
import NavBar from "../../../components/NavBar/NavBar";
import PlaceJumbotron from "../../../components/PlaceJumbotron/PlaceJumbotron";
import NearbyPlaces from "../../../components/NearbyPlaces/NearbyPlaces";
import Reviews from "../../../components/Reviews/Reviews";
import Footer from "../../../components/Footer/Footer";
import {useHistory} from "react-router-dom";
import placeholder from '../../../assets/placeholder.png';
import axios from "axios";
import {PLACE_DETAILS} from "../../../utils/routes";
import {getPlacePhoto, getRating} from "../../../utils/misc";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import {useParams} from "react-router";

const PlaceDetail = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [photo, setPhoto] = useState(placeholder);
    const [place, setPlace] = useState({});
    const [rating, setRating] = useState(0);

    const history = useHistory();
    const {placeId} = useParams();

    useEffect(() => {
        getRating(placeId).then(res => setRating(res)).catch(() => setRating(0));
    }, [placeId]);

    const getDetail = () => {
        setIsLoading(true);
        if (placeId === undefined){
            return history.push('/');
        }

        axios.post(PLACE_DETAILS, {place_id: placeId})
            .then(res => {
                const data = res.data;
                if (!data.success){
                    return setError(data.data);
                }

                setPlace(data.data);
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
                setError('Unable to get place details')
            })
    }

    const isFirstUpdate = useRef(true);
    useEffect(() => {
        if (isFirstUpdate.current){
            isFirstUpdate.current = false;
            return;
        }
        if (place.photos === undefined){
            return setError('Unable to get place details');
        }
        getPlacePhoto(setPhoto, place.photos[0].photo_reference)
            .then(() => setIsLoading(false))
            .catch(() => {
                setIsLoading(false);
                setError('Unable to get place details')
            });
    }, [place]);

    useEffect(() => {
        getDetail();
        //eslint-disable-next-line
    }, []);

    return(
        <Fragment>
            <LoadingSpinner isLoading={isLoading}/>
            <NavBar/>
            {error ? <p style={{marginTop: '10%', textAlign: 'center'}}>{error}</p> : isLoading ? null : place === undefined || null ? null : (
                <Fade>
                    <PlaceJumbotron
                        title={place.name}
                        type={place.types[0].split('_').join(' ')}
                        address={place.formatted_address}
                        rating={rating}
                        image={photo}
                        phone={place.formatted_phone_number}
                    />
                    <NearbyPlaces placeLocation={{
                        lat: place.geometry.location.lat,
                        lng: place.geometry.location.lng,
                    }}/>
                    <Reviews bg={photo} itemId={placeId} name={place.name}/>
                    <Footer/>
                </Fade>
            )}
        </Fragment>
    );
}

export default PlaceDetail;
