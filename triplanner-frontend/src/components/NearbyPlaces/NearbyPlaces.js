import React, {useEffect, useState} from "react";
import styles from './NearbyPlaces.module.css';
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";

import Place from "../Place/Place";
import PlacesFilters from "../PlacesFilters/PlacesFilters";
import SliderPrevButton from "../SliderPrevButton/SliderPrevButton";
import SliderNextButton from "../SliderNextButton/SliderNextButton";
import axios from "axios";
import {setNearbyPlaces, selectFilters, selectNearByPlaces} from "../../redux/slices/explore/nearbyPlaces";
import {GoogleMap, Marker} from '@react-google-maps/api';
import {useDispatch, useSelector} from "react-redux";

const NearbyPlaces = ({location}) => {
    const [mode, setMode] = useState('list');

    const [startingIndex, setStartingIndex] = useState(0);
    const [endingIndex, setEndingIndex] = useState(6);
    const placeWidth = 30;

    const filters = useSelector(selectFilters);
    const nearbyPlaces = useSelector(selectNearByPlaces);
    const dispatch = useDispatch();
    const [map, setMap] = React.useState(null)

    const containerStyle = {
        width: '100%',
        height: '100%'
    };

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    useEffect(() => {
        const api = axios.create({
            baseURL: 'http://localhost:5000/nearbyPlacesProxy'
        });

        const defaultKeywords = ['park', 'restaurant', 'zoo', 'hotel', 'museum'].join('|');
        const keyword = filters.length >= 1 ? filters.join('|') : defaultKeywords;

        api.post('/', {
            latitude: location.lat,
            longitude: location.lng,
            radius: 20000,
            keyword: keyword,
        }).then(res => {
            dispatch(setNearbyPlaces(res.data.response));
        }).catch(err => console.log(err.message));

        // eslint-disable-next-line
    }, [location, filters]);

    useEffect(() => {
        setStartingIndex(0);
        setEndingIndex(6);
    }, [filters]);

    return(
        <div className={styles.nearbyPlaces}>
            <div className={styles.nearbyPlaces_filterContainer}>
                <h3>Nearby Places</h3>
                <FormControl size={'small'} fullWidth>
                    <InputLabel id="view_as">View As</InputLabel>
                    <Select label={'View As'} labelId={'view_as'} value={mode} onChange={e => setMode(e.target.value)}>
                        <MenuItem value={'list'}>List</MenuItem>
                        <MenuItem value={'map'}>Map</MenuItem>
                    </Select>
                </FormControl>

                <h3>Filters</h3>
                <PlacesFilters/>
            </div>

            {mode === 'list' ? (
                <React.Fragment>
                    <div className={styles.nearbyPlaces_placesContainer}>
                        {nearbyPlaces.slice(startingIndex, endingIndex).map((place, index) => (
                            <Place
                                key={index}
                                width={placeWidth}
                                place={place}
                            />
                        ))}
                    </div>

                    <div className={styles.nearbyPlaces_btnContainer}>
                        <SliderPrevButton
                            startingIndex={startingIndex}
                            endingIndex={endingIndex}
                            setStartingIndex={setStartingIndex}
                            setEndingIndex={setEndingIndex}
                            count={2}
                        />

                        <SliderNextButton
                            startingIndex={startingIndex}
                            endingIndex={endingIndex}
                            setStartingIndex={setStartingIndex}
                            setEndingIndex={setEndingIndex}
                            count={2}
                            length={nearbyPlaces.length}
                        />
                    </div>
                </React.Fragment>
            ) : (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={{
                        lat: location.lat,
                        lng: location.lng
                    }}
                    zoom={18}
                >
                    <Marker position={location}/>
                </GoogleMap>
            )}
        </div>
    );
};

export default NearbyPlaces;