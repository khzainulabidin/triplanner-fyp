import React, {useEffect, useState} from "react";
import styles from './PlacesSection.module.css';
import Title from "../Title/Title";
import Place from "../Place/Place";
import Fade from 'react-reveal/Fade';
import {Link} from "react-router-dom";
import SliderPrevButton from "../SliderPrevButton/SliderPrevButton";
import SliderNextButton from "../SliderNextButton/SliderNextButton";
import {selectNearByPlaces, setNearbyPlaces} from "../../redux/slices/explore/nearbyPlaces";
import {setLocation} from "../../redux/slices/user/user";
import {useSelector, useDispatch} from "react-redux";
import axios from "axios";
import shuffle from 'shuffle-array';

const PlacesSection = ({isLoggedIn, user}) => {
    const [startingIndex, setStartingIndex] = useState(0);
    const [endingIndex, setEndingIndex] = useState(3);
    const placeWidth = 25;
    const haveInterests = isLoggedIn && user.interests.length > 1;

    const dispatch = useDispatch();
    const nearbyPlaces = useSelector(selectNearByPlaces);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position) {
            dispatch(setLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            }));

            const api = axios.create({
                baseURL: 'http://localhost:5000/nearbyPlacesProxy'
            });

            const defaultKeywords = shuffle(['park', 'restaurant', 'zoo', 'museum', 'cinema', 'hotel']).join('|');
            const keyword = (!isLoggedIn || user.interests < 1) ? defaultKeywords : user.interests.join('|');

            api.post('/', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                radius: 20000,
                keyword: keyword,
            }).then(res => {
                dispatch(setNearbyPlaces(res.data.response));
            }).catch(err => console.log(err.message));
        });

        // eslint-disable-next-line
    }, [user]);

    return(
        <div className={styles.placesSection}>
            <Fade>
                <Title
                    title={haveInterests ? 'Based on your' : 'Popular places'}
                    titleHighlight={haveInterests ? 'Interests' : 'Nearby'}
                />

                <div className={styles.placesSection_places}>
                    <SliderPrevButton
                        startingIndex={startingIndex}
                        endingIndex={endingIndex}
                        setStartingIndex={setStartingIndex}
                        setEndingIndex={setEndingIndex}
                        count={1}
                    />

                    {nearbyPlaces.slice(startingIndex, endingIndex).map((place, index) => {
                        return(
                            <Place
                                key={index}
                                width={placeWidth}
                                place={place}
                            />);
                    })}

                    <SliderNextButton
                        startingIndex={startingIndex}
                        endingIndex={endingIndex}
                        setStartingIndex={setStartingIndex}
                        setEndingIndex={setEndingIndex}
                        count={1}
                        length={nearbyPlaces.length}
                    />
                </div>

                <div className={styles.placesSection_allPlacesLink}>
                    <Link to={'/allPlaces'}>View All Places</Link>
                </div>
            </Fade>
        </div>
    );
};

export default PlacesSection;