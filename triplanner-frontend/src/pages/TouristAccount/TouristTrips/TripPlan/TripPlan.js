import styles from './TripPlan.module.css';
import {useHistory, useParams} from "react-router-dom";
import React, {useEffect, useState, Fragment, useRef} from "react";
import {getMe} from "../../../../utils/auth";
import axios from "axios";
import {BOOKINGS_ROUTE, BUSINESS_BOOKING, TRIPS_ROUTE, UPDATE_JOIN_REQUEST} from "../../../../utils/routes";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import ErrorPageLayout from "../../../../components/ErrorPageLayout/ErrorPageLayout";
import {useReactToPrint} from "react-to-print";
import TopOptions from "./TPTopOptions/TopOptions";
import SourceDestInfo from "./TPSourceDestInfo/SourceDestInfo";
import TPTimeline from "./TPTimeline/TPTimeline";
import RouteMap from "../../../../components/RouteMap/RouteMap";
import TPWeather from "./TPWeather/TPWeather";
import TPBookings from "./TPBookings/TPBookings";
import TPUsers from "./TPUsers/TPUsers";
import TPBudget from "./TPBudget/TPBudget";
import TPPrivacy from "./TPPrivacy/TPPrivacy";
import TPTimings from "./TPTimings/TPTimings";
import {Fade} from "react-reveal";
import {refundPayment} from "../../../../utils/misc";

const TripPlan = () => {
    const [user, setUser] = useState({});
    const [trip, setTrip] = useState({});
    const [error, setError] = useState('');
    const [privacy, setPrivacy] = useState('noValue');
    const [isLoading, setIsLoading] = useState(true);

    const params = useParams();
    const {tripId} = params;
    const componentRef = useRef();
    const history = useHistory();

    const fetchDetails = async () => {
        try {
            if (tripId === null || tripId === undefined || tripId === ''){
                return setError('Unable to fetch trip plan');
            }
            setIsLoading(true);

            const userRes = await getMe();
            if (!userRes){
                setIsLoading(false);
                return setError('Unable to fetch trip plan');
            }
            setUser(userRes);

            const res = await axios.get(`${TRIPS_ROUTE}/${tripId}`, {headers: {'x-access-token': localStorage.getItem('token')}});
            const data = res.data;
            if (!data.success){
                setIsLoading(false);
                return setError('Unable to fetch trip plan');
            }
            setTrip(data.data);
            setIsLoading(false);
        }
        catch (e){
            setIsLoading(false);
            setError('Unable to fetch trip plan')
        }
    }

    const printPage = useReactToPrint({
        content: () => componentRef.current
    });

    const cancelBooking = async (bookingId, hotelId) => {
        try {
            setIsLoading(true);
            const bookingRes = await axios.get(`${BOOKINGS_ROUTE}/${bookingId}`, {headers: {'x-access-token': localStorage.getItem('token')}});
            const bookingData = bookingRes.data;
            if (!bookingData.success){
                setIsLoading(false);
                return setError('Unable to cancel booking at this time. Try reloading the page.');
            }

            const fetchedBooking = bookingData.data;
            if (fetchedBooking.paymentMethod === 'Online Payment'){
                const isRefunded = await refundPayment(fetchedBooking._id, fetchedBooking.paymentDetails.id, fetchedBooking.payment);
                if (!isRefunded){
                    setIsLoading(false);
                    return setError('Unable to refund payment at this time. Try reloading the page.');
                }
            }

            const res = await axios.put(BUSINESS_BOOKING, {id: bookingId, statusUpdate: 'Cancelled', hotelId}, {headers: {'x-access-token': localStorage.getItem('token')}});
            const data = res.data;
            if (!data.success){
                setIsLoading(false);
                return setError('Unable to cancel booking at this time. Try reloading the page.');
            }

            const bookingIndex = trip.bookings.findIndex(booking => booking._id === bookingId);
            const updatedBookings = trip.bookings;
            updatedBookings[bookingIndex].status = 'Cancelled';
            const tripRes = await axios.put(TRIPS_ROUTE, {tripId, update: {bookings: updatedBookings}}, {headers: {'x-access-token': localStorage.getItem('token')}});
            const tripData = tripRes.data;
            if (!tripData.success){
                setIsLoading(false);
                return setError('Unable to cancel booking at this time. Try reloading the page.');
            }

            setTrip(tripData.data);
            setIsLoading(false);
        }
        catch (e){
            setIsLoading(false);
            return setError('Unable to cancel booking at this time. Try reloading the page.');
        }
    }

    const cancelJoinRequest = async username => {
        try{
            setIsLoading(true);
            const res = await axios.put(UPDATE_JOIN_REQUEST, {tripId, status: 'Cancelled', username}, {headers: {'x-access-token': localStorage.getItem('token')}});
            const data = res.data;
            if (!data.success){
                setIsLoading(false);
                return setError('Unable to cancel request');
            }
            setTrip(data.data);
            setIsLoading(false);
        }
        catch (e){
            setIsLoading(false);
            return setError('Unable to cancel request');
        }
    }

    const updatePrivacy = async () => {
        if (privacy === 'noValue' || privacy === trip.privacy){
            return;
        }

        setIsLoading(true);
        const res = await axios.put(TRIPS_ROUTE, {tripId, update: {privacy}}, {headers: {'x-access-token': localStorage.getItem('token')}});
        const data = res.data;
        if (!data.success){
            setIsLoading(false);
            return setError('Unable to update privacy at this time. Try reloading the page.');
        }

        setTrip(data.data);
        setIsLoading(false);
    }

    const deletePlan = async () => {
        try {
            setIsLoading(true);
            const res = await axios.delete(`${TRIPS_ROUTE}/${tripId}`, {headers: {'x-access-token': localStorage.getItem('token')}});
            const data = res.data;
            if (!data.success){
                setIsLoading(false);
                return setError('Unable to delete plan. Try reloading the page.');
            }
            if (trip.selectedRooms.length > 0 && trip.bookings.length > 0){
                for (let i=0; i<trip.selectedRooms.length; i++){
                    await cancelBooking(trip.bookings[i].id, trip.selectedRooms[i].hotel.userId)
                }
            }
            setIsLoading(false);
            history.push('/trips');
        }
        catch (e){
            setIsLoading(false);
            return setError('Unable to delete plan. Try reloading the page.');
        }
    }

    useEffect(() => {
        updatePrivacy().catch(() => setIsLoading(false));
        //eslint-disable-next-line
    }, [privacy])

    useEffect(() => {
        fetchDetails().catch(() => setIsLoading(false));
        //eslint-disable-next-line
    }, []);

    return(
        <Fragment>
            <LoadingSpinner isLoading={isLoading}/>
            {isLoading ? null : error ? <ErrorPageLayout text={error}/> : trip && user ?
                <div className={styles.tripPlan} ref={componentRef}>
                    <Fade>
                        <TopOptions printPage={printPage} trip={trip} user={user} deletePlan={deletePlan}/>
                    </Fade>

                    <Fade>
                        <SourceDestInfo trip={trip}/>
                    </Fade>

                    <Fade>
                        <TPTimeline trip={trip}/>
                    </Fade>

                    {trip.destinationIds.length > 0 && <Fade>
                        <h1 className={styles.cardTitle}>Your route</h1>
                        <RouteMap setError={setError} source={trip.source} destinationIds={trip.destinationIds}/>
                    </Fade>}

                    {trip.destinations.length > 0 && <Fade>
                        <h1 className={styles.cardTitle}>Weather predictions</h1>
                        <TPWeather trip={trip}/>
                    </Fade>}

                    {trip.selectedRooms.length > 0 && trip.bookings.length > 0 && <Fade>
                        <h1 className={styles.cardTitle}>Bookings</h1>
                        <TPBookings trip={trip}/>
                    </Fade>}

                    <Fade>
                        <h1 className={styles.cardTitle}>Budget details</h1>
                        <TPBudget trip={trip}/>
                    </Fade>

                    {trip.usersAccompanying.length > 0 && <Fade>
                        <h1 className={styles.cardTitle}>Friends accompanying</h1>
                        <TPUsers user={user} trip={trip} cancelRequest={cancelJoinRequest}/>
                    </Fade>}

                    <Fade>
                        <h1 className={styles.cardTitle}>Trip privacy</h1>
                        <TPPrivacy trip={trip} privacy={privacy} setPrivacy={setPrivacy} user={user}/>
                    </Fade>

                    <Fade>
                        <h1 className={styles.cardTitle}>Trip creation details</h1>
                        <TPTimings trip={trip}/>
                    </Fade>
                </div> : <ErrorPageLayout text={'Unable to fetch trip plan. Try reloading the page.'}/>
            }
        </Fragment>
    );
};

export default TripPlan;
