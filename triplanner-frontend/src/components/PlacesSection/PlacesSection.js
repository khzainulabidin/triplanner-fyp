import React, {useEffect, useState} from "react";
import styles from './PlacesSection.module.css';
import Title from "../Title/Title";
import Place from "../Place/Place";
import Fade from 'react-reveal/Fade';
import {Link} from "react-router-dom";
import SliderPrevButton from "../SliderPrevButton/SliderPrevButton";
import SliderNextButton from "../SliderNextButton/SliderNextButton";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import {getPlaces} from "../../utils/misc";

const PlacesSection = () => {
    const [startingIndex, setStartingIndex] = useState(0);
    const [endingIndex, setEndingIndex] = useState(3);
    const [isLoading, setIsLoading] = useState(true);
    const [interests, setInterests] = useState([]);
    const [nearbyPlaces, setNearbyPlaces] = useState([]);
    const [error, setError] = useState('');

    const placeWidth = 27;

    useEffect(() => {
        setIsLoading(true);
        getPlaces(setInterests, interests, setNearbyPlaces, setError)
            .then(() => setIsLoading(false))
            .catch((e) => {
                setIsLoading(false);
                setError('Cannot connect to the server');
                console.log(e.message);
            });
        //eslint-disable-next-line
    }, []);

    return(
        <div className={styles.placesSection}>
            <LoadingSpinner isLoading={isLoading}/>
            {error ? <p className={styles.error}>{error}</p> : isLoading ? null : (
                <Fade>
                    <Title
                        title={interests.length > 0 ? 'Based on your' : 'Popular places'}
                        titleHighlight={interests.length > 0 ? 'Interests' : 'Nearby'}
                    />
                    <div className={styles.placesSection_places}>
                        {nearbyPlaces.length < 3 ? null : (
                            <SliderPrevButton
                                startingIndex={startingIndex}
                                endingIndex={endingIndex}
                                setStartingIndex={setStartingIndex}
                                setEndingIndex={setEndingIndex}
                                count={1}
                            />
                        )}

                        {nearbyPlaces.slice(startingIndex, endingIndex).map((place, index) => (
                            <Place
                                key={index}
                                width={placeWidth}
                                place={place}
                            />
                        ))}

                        {nearbyPlaces.length < 3 ? null : (
                            <SliderNextButton
                                startingIndex={startingIndex}
                                endingIndex={endingIndex}
                                setStartingIndex={setStartingIndex}
                                setEndingIndex={setEndingIndex}
                                count={1}
                                length={nearbyPlaces.length}
                            />
                        )}
                    </div>

                    <div className={styles.placesSection_allPlacesLink}>
                        <Link to={'/allPlaces'}>View All Places</Link>
                    </div>
                </Fade>
            )}
        </div>
    );
};

export default PlacesSection;
