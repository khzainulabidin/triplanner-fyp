import React, {useState, Fragment, useEffect} from "react";
import NoUserWindow from "../../../components/NoUserWindow/NoUserWindow";
import TouristLayout from "../../../components/TouristLayout/TouristLayout";
import MyCard from "../../../components/MyCard/MyCard";
import styles from "./TouristTrips.module.css";
import {Link} from "react-router-dom";
import {getMe} from "../../../utils/auth";
import axios from "axios";
import {GET_OTHER_TRIPS, TRIPS_ROUTE, UPDATE_JOIN_REQUEST} from "../../../utils/routes";
import ReadyFor from "../../../components/ReadyFor/ReadyFor";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import {formatDate} from "../../../utils/misc";
import {Fade} from 'react-reveal';
import ErrorPageLayout from "../../../components/ErrorPageLayout/ErrorPageLayout";

const TouristTrips= () => {
    const [isLoading, setIsLoading] = useState(true);
    const [trips, setTrips] = useState([]);
    const [user, setUser] = useState({});
    const [mode, setMode] = useState('myTrips');
    const [error, setError] = useState('');

    const fetchData = async (route, status) => {
        setIsLoading(true);
        const res = await axios.get(route, {headers: {'x-access-token': localStorage.getItem('token')}});
        const data = res.data;
        if (!data.success){
            setIsLoading(false);
            return setError('Unable to fetch trips. Try reloading the page');
        }

        let tripResults = data.data;
        if (status){
            tripResults = data.data.filter(item => item.usersAccompanying.some(elem => elem.status === status && elem.username === user.username));
        }

        setTrips(tripResults.reverse());
        setIsLoading(false);
    }

    useEffect(() => {
        if (mode === 'myTrips'){
            fetchData(TRIPS_ROUTE).catch(() => setIsLoading(false));
        }
        else if (mode === 'sharedTrips'){
            fetchData(`${GET_OTHER_TRIPS}/${user.username}`, 'Accepted').catch(() => setIsLoading(false));
        }
        else if (mode === 'joinRequests'){
            fetchData(`${GET_OTHER_TRIPS}/${user.username}`, 'Pending').catch(() => setIsLoading(false));
        }

        //eslint-disable-next-line
    }, [mode]);

    const fetchUser = async () => {
        setIsLoading(true);
        const userRes = await getMe();
        if (!userRes){
            setIsLoading(false);
            return setError('Unable to fetch trips. Try reloading the page');
        }

        setUser(userRes);
        setIsLoading(false);
    }

    const updateJoinRequest = async (tripId, status) => {
        try{
            setIsLoading(true);
            const res = await axios.put(UPDATE_JOIN_REQUEST, {tripId, status, username: user.username}, {headers: {'x-access-token': localStorage.getItem('token')}});
            const data = res.data;
            if (!data.success){
                setIsLoading(false);
                return setError('Unable to update request. Try reloading the page');
            }
            setIsLoading(false);
            setMode('sharedTrips')
        }
        catch (e){
            setIsLoading(false);
            return setError('Unable to update request. Try reloading the page');
        }
    }

    useEffect(() => {
        fetchUser().catch(() => setIsLoading(false));
    }, [])

    return(
        error ? <ErrorPageLayout text={error}/> : <TouristLayout isLoading={isLoading}>
            {isLoading ? null : trips && user ? (
                <Fragment>
                    <div style={{width: '100%'}}>
                        <ReadyFor title={'Ready to explore new worlds?'} actionText={'Plan your trip'} route={'/planTrip'}/>

                        {trips.length > 0 && <ReadyFor title={'Want to make new friends along your journey?'} actionText={'Find people'}
                                                       route={'/commonPoint'}/>}

                        <div className={styles.tripOptions}>
                            <h1 className={styles.heading}>
                                {mode === 'myTrips' && <Fade><span>My trips</span></Fade>}
                                {mode === 'sharedTrips' && <Fade><span>Shared trips</span></Fade>}
                                {mode === 'joinRequests' && <Fade><span>Join requests</span></Fade>}
                            </h1>

                            <div>
                                {mode !== 'sharedTrips' && <Fade><p onClick={() => setMode('sharedTrips')}>View shared trips</p></Fade>}
                                {mode !== 'myTrips' && <Fade><p onClick={() => setMode('myTrips')}>My trips</p></Fade>}
                                {mode !== 'joinRequests' && <Fade><p onClick={() => setMode('joinRequests')}>View join requests</p></Fade>}
                            </div>
                        </div>

                        {trips.length > 0 ? trips.map((trip, index) => (
                            <Fade key={index}>
                                <div className={styles.innerLay} style={{backgroundSize: `${Math.floor((Math.random()*500)+400)}px`}}>
                                    <MyCard style={{background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)'}}>
                                        <div className={styles.tripContainer}>
                                            <div className={styles.tripDesc}>
                                                <h4>{trip.source.name} <span><ArrowRightAltIcon/></span> {trip.destinations[trip.destinations.length-1].name}</h4>
                                                <p>{formatDate(Number(trip.departureTime))}</p>
                                            </div>

                                            {(mode === 'myTrips' || mode === 'sharedTrips') && <Link to={`/tripPlan/${trip._id}`}>View Trip Plan</Link>}

                                            {mode === 'joinRequests' && <div className={styles.joinOptions}>
                                                <p onClick={() => updateJoinRequest(trip._id, 'Accepted')}>Accept</p>
                                                <p onClick={() => updateJoinRequest(trip._id, 'Declined')}>Decline</p>
                                                <Link to={`/tripPlan/${trip._id}`}>View</Link>
                                            </div>}
                                        </div>
                                    </MyCard>
                                </div>
                            </Fade>
                        )) : <Fade><MyCard>
                            {mode === 'myTrips' && <p className={styles.noTrips}>You have not created any trip plans yet</p>}
                            {mode === 'sharedTrips' && <p className={styles.noTrips}>No shared trips</p>}
                            {mode === 'joinRequests' && <p className={styles.noTrips}>No requests</p>}
                        </MyCard></Fade>}

                    </div>
                </Fragment>) : <div className={'noUserContainer'}><NoUserWindow/></div>}
        </TouristLayout>
    );
}

export default TouristTrips;
