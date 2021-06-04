import React, {createContext, Fragment, useEffect, useMemo, useState} from "react";
import styles from './NearbyPlaces.module.css';
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import Place from "../Place/Place";
import PlacesFilters from "../PlacesFilters/PlacesFilters";
import SliderPrevButton from "../SliderPrevButton/SliderPrevButton";
import SliderNextButton from "../SliderNextButton/SliderNextButton";
import {BicyclingLayer, GoogleMap, Marker, TransitLayer} from '@react-google-maps/api';
import {getPlaces} from "../../utils/misc";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import {makeStyles} from "@material-ui/core/styles";

export const FiltersContext = createContext(null);

const useStyles = makeStyles({
    root: {
        "& .MuiInputLabel-root": {
            color: "#FBFBFB"
        },
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#FBFBFB"
        },
        "& .MuiSelect-icon": {
            fill: "#FBFBFB"
        }
    }
});

const NearbyPlaces = ({placeLocation, placeId}) => {
    const [mode, setMode] = useState('list');
    const [startingIndex, setStartingIndex] = useState(0);
    const [endingIndex, setEndingIndex] = useState(6);
    const [isLoading, setIsLoading] = useState(true);
    const [interests, setInterests] = useState([]);
    const [nearbyPlaces, setNearbyPlaces] = useState([]);
    const [error, setError] = useState('');
    const [location, setLocation] = useState(null);
    const [filters, setFilters] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);

    const providerValue = useMemo(() => ({filters, setFilters}), [filters]);

    const placeWidth = window.innerWidth >= 768 ? 30 : 100;
    const classes = useStyles();

    useEffect(() => {
        setIsLoading(true);
        getPlaces(setInterests, interests, setNearbyPlaces, setError, filters, setLocation, setFilteredPlaces, placeLocation)
            .then(() => setIsLoading(false))
            .catch(() => {setError('Cannot connect to the server')});
        setStartingIndex(0);
        setEndingIndex(6);
        // eslint-disable-next-line
    }, [filters]);

    return(
        <Fragment>
            {isLoading ? null : (
                <div className={styles.nearbyPlaces}
                     style={{minHeight: mode === 'list' ? '100vh' : '', height: mode === 'map' ? '100vh' : ''}}>
                    <div className={styles.nearbyPlaces_filterContainer}>
                        <h3>Nearby Places</h3>
                        <FormControl size={'small'} fullWidth className={classes.root}>
                            <InputLabel id="view_as" style={{color: 'white'}}>View As</InputLabel>
                            <Select style={{color: 'white'}} label={'View As'} labelId={'view_as'} value={mode} onChange={e => setMode(e.target.value)}>
                                <MenuItem value={'list'}>List</MenuItem>
                                <MenuItem value={'map'}>Map</MenuItem>
                            </Select>
                        </FormControl>

                        {mode === 'list' ? (
                            <Fragment>
                                <h3>Filters</h3>
                                <FiltersContext.Provider value={providerValue}>
                                    <PlacesFilters/>
                                </FiltersContext.Provider>
                            </Fragment>
                        ) : null}
                    </div>

                    {error ? <p className={styles.error}>{error}</p> : mode === 'list' ? (
                        <Fragment>
                            <LoadingSpinner isLoading={isLoading}/>
                            <div className={styles.nearbyPlaces_placesContainer}>
                                {!placeId && filteredPlaces.slice(startingIndex, endingIndex).map((place, index) => (
                                    <Place
                                        key={index}
                                        width={placeWidth}
                                        place={place}
                                    />
                                ))}

                                {placeId && filteredPlaces.filter(place => place.place_id !== placeId).slice(startingIndex, endingIndex).map((place, index) => (
                                    <Place
                                        key={index}
                                        width={placeWidth}
                                        place={place}
                                    />
                                ))}
                            </div>

                            {filteredPlaces.length <= 6 ? null : (
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
                            )}
                        </Fragment>
                    ) : (
                        <GoogleMap
                            clickableIcons={true}
                            tilt={45}
                            mapContainerStyle={{
                                width: '100%',
                                height: '100%'
                            }}
                            center={{
                                lat: location.lat,
                                lng: location.lng
                            }}
                            zoom={18}
                        >
                            <Marker position={location} animation={'Bounce'} opacity={0.9}/>
                            <TransitLayer/>
                            <BicyclingLayer/>
                        </GoogleMap>
                    )}
                </div>
            )}
        </Fragment>
    );
};

export default NearbyPlaces;
