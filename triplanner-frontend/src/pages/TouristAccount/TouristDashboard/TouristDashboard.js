import TouristLayout from "../../../components/TouristLayout/TouristLayout";
import styles from './TouristDashboard.module.css';
import ReadyFor from "../../../components/ReadyFor/ReadyFor";
import React, {useEffect, useState} from "react";
import {getMe, getOtherProfile} from "../../../utils/auth";
import axios from "axios";
import {GET_FRIENDS_TRIPS, GET_USERS_BY_CITY} from "../../../utils/routes";
import ProfileCard from "../../../components/ProfileCard/ProfileCard";
import NoUserWindow from "../../../components/NoUserWindow/NoUserWindow";
import TripCard from "../../../components/TripCard/TripCard";
import {v4 as uuid} from 'uuid';
import WeatherByLocation from "../../../components/WeatherByLocation/WeatherByLocation";
import {Fade} from 'react-reveal';

const TouristDashboard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState({});
    const [nearbyUsers, setNearbyUsers] = useState([]);
    const [friendTrips, setFriendTrips] = useState([]);
    const [location, setLocation] = useState(null);

    const fetchData = async () => {
        setIsLoading(true);

        const userRes = await getMe();
        if (userRes){
            setUser(userRes);
            const usersRes = await axios.get(`${GET_USERS_BY_CITY}/${userRes.city}`, {headers: {'x-access-token': localStorage.getItem('token')}});
            const usersData = usersRes.data;

            if (!usersData.success){
                setNearbyUsers([]);
            }
            else {
                const localUsers = [];
                for (let i=0; i<usersData.data.length; i++){
                    const otherUser = await getOtherProfile(usersData.data[i].userId);
                    localUsers.push(otherUser);
                }
                let filteredUsers = localUsers.filter(person => person.userId !== userRes.userId);
                setNearbyUsers(filteredUsers);
            }

            const tripsRes = await axios.get(`${GET_FRIENDS_TRIPS}/${userRes.userId}`, {headers: {'x-access-token': localStorage.getItem('token')}})
            const tripsData = tripsRes.data;
            if (!tripsData.success){
                setFriendTrips([]);
            }
            else {
                setFriendTrips(tripsData.data);
            }
        }
        else {
            setUser(null);
        }

        setIsLoading(false);
    }

    useEffect(() => {
        setIsLoading(true);
        if (sessionStorage.getItem('location') !== undefined && sessionStorage.getItem('location') !== null && sessionStorage.getItem('location') !== ''){
            const storageLocation = sessionStorage.getItem('location').split('|');
            setLocation({
                lat: Number(storageLocation[0]),
                lng: Number(storageLocation[1])
            });
        }
        else {
            navigator.geolocation.getCurrentPosition(position => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            });
        }
        fetchData().catch(() => setIsLoading(false));
    }, [])

    return(
        <TouristLayout isLoading={isLoading}>
            {isLoading ? null : user ? <Fade><div style={{width: '100%'}}>
                <Fade><ReadyFor title={'Ready to explore new worlds?'} actionText={'Plan your trip'} route={'/planTrip'}/></Fade>

                {location && <Fade><WeatherByLocation location={location}/></Fade>}

                {friendTrips && friendTrips.length > 0 &&
                <Fade>
                    <h1 className={styles.sectionTitle}>Plans by your friends</h1>
                    <div className={styles.users}>
                        {friendTrips.map(({trips, username}) => trips.map(trip => (
                            <TripCard trip={trip} username={username} key={uuid()}/>
                        )))}
                    </div>
                </Fade>}

                {nearbyUsers && nearbyUsers.length > 0 &&
                <Fade>
                    <h1 className={styles.sectionTitle}>TriPlanners nearby</h1>
                    <div className={styles.users}>
                        {nearbyUsers.map((user, index) => (
                            <ProfileCard user={user} key={index} margin={'40%'}/>
                        ))}
                    </div>
                </Fade>}

            </div></Fade> : <Fade><NoUserWindow/></Fade>}
        </TouristLayout>
    );
}

export default TouristDashboard;
