import React, {Fragment, useEffect, useState} from "react";
import styles from './CommonPoint.module.css';
import axios from "axios";
import {GET_COMMON_TRIPS, GET_LOCATION, TRIPS_ROUTE} from "../../../utils/routes";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import {Link} from "react-router-dom";
import ReadyFor from "../../../components/ReadyFor/ReadyFor";
import {getMe, getOtherProfile} from "../../../utils/auth";
import {BicyclingLayer, GoogleMap, Marker, TransitLayer} from "@react-google-maps/api";
import ProfileCard from "../../../components/ProfileCard/ProfileCard";
import ErrorPageLayout from "../../../components/ErrorPageLayout/ErrorPageLayout";
import TripCard from "../../../components/TripCard/TripCard";
import {Fade} from "react-reveal";

const CommonPoint = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [tripInput, setTripInput] = useState('select')
    const [destinationInput, setDestinationInput] = useState('select');
    const [trips, setTrips] = useState([]);
    const [selectedTrip, setSelectedTrip] = useState({});
    const [destinations, setDestinations] = useState([]);
    const [commonTrips, setCommonTrips] = useState([]);
    const [latLng, setLatLng] = useState({});
    const [users, setUsers] = useState([]);
    const [me, setMe] = useState({});

    const fetchTrips = async () => {
        setIsLoading(true);
        const meRes = await getMe();
        setMe(meRes);
        const res = await axios.get(TRIPS_ROUTE, {headers: {'x-access-token': localStorage.getItem('token')}});
        const data = res.data;
        if (!data.success){
            setIsLoading(false);
            return setError('Unable to fetch trips. Try reloading the page');
        }
        setTrips(data.data.filter(item => item.privacy === 'public').reverse());
        setIsLoading(false);
    }

    useEffect(() => {
        if (tripInput === 'select'){
            setDestinationInput('select');
            return;
        }

        const trip = trips.filter(trip => trip._id === tripInput);
        setSelectedTrip(trip[0]);
        setDestinations(trip[0].destinations);
    }, [tripInput, trips]);

    const getCommonTrips = async () => {
        setIsLoading(true);
        const destinationData = destinationInput.split('|');
        const locationRes = await axios.post(GET_LOCATION, {placeId: destinationData[1]});
        const locationData = locationRes.data;
        if (!locationData.success){
            setLatLng({});
        }else {
            setLatLng(locationData.data);
        }

        const res = await axios.get(`${GET_COMMON_TRIPS}/${destinationData[0]}`, {headers: {'x-access-token': localStorage.getItem('token')}});
        const data = res.data;
        if (!data.success){
            setIsLoading(false);
            return setCommonTrips([]);
        }

        const filteredTrips = data.data.filter(item => item._id !== tripInput && item.departureTime > new Date(selectedTrip.departureTime).setHours(0, 0, 0, 0) && item.departureTime <= new Date(selectedTrip.departureTime).setHours(23, 59, 59, 59));
        setCommonTrips(filteredTrips);
        setIsLoading(false);
    }

    const fetchUsers = async () => {
        setIsLoading(true);
        const localUsers = [];
        for (let i=0; i<commonTrips.length; i++){
            const user = await getOtherProfile(commonTrips[i].userId);
            if (user && user.userId !== me.userId){
                localUsers.push(user);
            }
        }

        setUsers(localUsers);
        setIsLoading(false);
    }

    useEffect(() => {
        if (commonTrips.length < 1){
            return;
        }

        fetchUsers().catch(() => {
            setUsers([]);
            setIsLoading(false)
        });

        //eslint-disable-next-line
    }, [commonTrips]);

    useEffect(() => {
        if (destinationInput === 'select'){
            return;
        }

        getCommonTrips().catch(() => setIsLoading(false));
        //eslint-disable-next-line
    }, [destinationInput]);

    useEffect(() => {
        fetchTrips().catch(() => setIsLoading(false));
    }, []);

    return(
        <Fragment>
            <LoadingSpinner isLoading={isLoading}/>
            {isLoading ? null : error ? <ErrorPageLayout text={error}/> : <Fragment>
                <Fade>
                    <div className={'backTopBar'}>
                        <Link to={'/trips'}>Back</Link>
                    </div>
                </Fade>

                <Fade>
                    <div className={styles.innerLay}>
                        <div className={styles.searchContainer}>
                            <h1 className={styles.title}>Meet new people along your journey</h1>

                            <div className={'PTGridContainer'}>
                                <select className={'PTInput'} value={tripInput}
                                        onChange={e => setTripInput(e.target.value)}>
                                    <option value={'select'}>Select public trip plan</option>
                                    {trips && trips.map((trip, index) => (
                                        <option value={trip._id}
                                                key={index}>From {trip.source.name} to {trip.destination.name}</option>
                                    ))}
                                </select>

                                <select className={'PTInput'} value={destinationInput}
                                        onChange={e => setDestinationInput(e.target.value)}
                                        disabled={tripInput === 'select'}>
                                    <option value={'select'}>Select destination</option>
                                    {destinations && destinations.map((destination, index) => (
                                        <option value={`${destination.name}|${destination.id}`}
                                                key={index}>{destination.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </Fade>

                {destinationInput !== 'select' && commonTrips.length < 1 && <Fade><div className={styles.noTrips}>
                    <p>Unfortunately, there are no common trips for {destinationInput.split('|')[0]} on the same day</p>
                </div></Fade>}

                {commonTrips && commonTrips.length > 0 &&
                <div className={styles.container}>
                    <Fade>
                        <h1 className={styles.sectionTitle}>We found {commonTrips.length} common
                            trip{commonTrips.length > 1 ? 's' : ''}</h1>
                        <ReadyFor
                            title={"Let's discuss the meeting plan"}
                            actionText={'Discussion Group'}
                            route={`/discussionGroup/${destinationInput.split('|')[1]}/${new Date(selectedTrip.departureTime).setHours(0, 0, 0, 0)}`}
                        />
                    </Fade>

                    {users && users.length > 0 &&
                    <Fade>
                        <h1 className={styles.sectionTitle}>People visiting {destinationInput.split('|')[0]} on the same
                            day</h1>
                        <div className={styles.profiles}>

                            {users.map((user, index) => (
                                <ProfileCard user={user} key={index}/>
                            ))}
                        </div>
                    </Fade>}

                    {latLng && <Fade>
                        <h1 className={styles.sectionTitle}>Meeting Point</h1>
                        <GoogleMap
                            clickableIcons={true}
                            tilt={45}
                            mapContainerStyle={{
                                width: '100%',
                                height: '300px',
                                borderRadius: '10px',
                                boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)'
                            }}
                            center={{
                                lat: latLng.lat,
                                lng: latLng.lng
                            }}
                            zoom={10}
                        >
                            <Marker position={latLng} animation={'Bounce'} opacity={0.9}/>
                            <TransitLayer/>
                            <BicyclingLayer/>
                        </GoogleMap>
                    </Fade>}

                    {commonTrips && commonTrips.length > 0 && users && users.length > 0 &&
                    <Fade>
                        <h1 className={styles.sectionTitle}>Trips involved</h1>
                        <div className={styles.profiles}>

                            {commonTrips.map((trip, index) => (
                                <TripCard trip={trip} username={users[index].username} key={index}/>
                            ))}
                        </div>
                    </Fade>}

                </div>}
            </Fragment>}
        </Fragment>
    )
};

export default CommonPoint;
