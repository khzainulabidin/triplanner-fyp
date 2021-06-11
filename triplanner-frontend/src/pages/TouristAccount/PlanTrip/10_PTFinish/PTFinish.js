import React, {Fragment, useEffect, useState} from "react";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import PlanTripLayout from "../../../../components/PlanTripLayout/PlanTripLayout";
import {getMe} from "../../../../utils/auth";
import axios from "axios";
import {BUSINESS_BOOK_ROOM, REQUEST_TO_JOIN, TRIPS_ROUTE} from "../../../../utils/routes";
import {useHistory} from "react-router-dom";

const PTFinish = ({progress, inputs, setInputs, clickBack}) => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({});

    const history = useHistory();

    const generateTrip = async () => {
        try {
            if (inputs.privacy === ''){
                return setError('Please select plan privacy to continue.');
            }

            setIsLoading(true);
            const bookings = [];

            if (inputs.selectedRooms.length > 0){
                for (let i=0; i<inputs.selectedRooms.length; i++){
                    const room = inputs.selectedRooms[i];
                    const checkout = new Date(inputs.departureTime);
                    const checkinTime = checkout.getTime();
                    checkout.setDate(checkout.getDate()+1);
                    const checkoutTime = checkout.getTime();

                    const bookingDetails = {
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        guests: Number(inputs.numberOfGuests) < 1 ? 1 : Number(inputs.numberOfGuests),
                        city: room.hotel.city,
                        hotel: room.hotel.name,
                        checkIn: Number(checkinTime),
                        checkOut: Number(checkoutTime),
                        roomType: room.room.type,
                        status: 'Confirmed',
                        paymentMethod: 'Online Payment',
                        payment: Number(room.room.price),
                        paymentDetails: inputs.paymentDetails
                    }

                    const bookingRes = await axios.post(BUSINESS_BOOK_ROOM, {booking: bookingDetails, hotelId: room.hotel.userId}, {headers: {'x-access-token': localStorage.getItem('token')}});
                    const data = bookingRes.data;

                    if (!data.success){
                        setIsLoading(false);
                        return setError('Unable to book room at this time');
                    }

                    const newBooking = data.data;
                    bookings.push({id: newBooking._id, status: newBooking.status});
                }
            }

            const tripPlan = {
                source: inputs.source,
                destination: inputs.destinations[inputs.destinations.length-1],
                departureTime: new Date(inputs.departureTime).getTime(),
                destinations: inputs.destinations,
                totalBudget: Number(inputs.totalBudget) > 0 ? Number(inputs.totalBudget) : 0,
                usingOwnCar: inputs.usingOwnCar,
                fuelAverage: Number(inputs.fuelAverage) > 0 ? Number(inputs.fuelAverage) : 0,
                availableBudget: Number(inputs.availableBudget) > 0 ? Number(inputs.availableBudget) : 0,
                timeDistances: inputs.timeDistances,
                fuelType: inputs.usingOwnCar ? inputs.fuelType : '',
                fuelCost: Number(inputs.fuelCost) > 0 ? Number(inputs.fuelCost) : 0,
                destinationIds: inputs.destinationIds,
                numberOfGuests: Number(inputs.numberOfGuests) > 0 ? Number(inputs.numberOfGuests) : 1,
                placesToStay: inputs.placesToStay,
                usersAccompanying: inputs.usersAccompanying,
                interests: inputs.interests,
                suggestedPlacesToVisit: inputs.suggestedPlacesToVisit,
                selectedRooms: inputs.selectedRooms,
                privacy: inputs.privacy,
                bookings: bookings
            };

            const trip = await axios.post(TRIPS_ROUTE, {trip: tripPlan}, {headers: {'x-access-token': localStorage.getItem('token')}});
            const data = trip.data;
            if (!data.success){
                setIsLoading(false);
                return setError('Unable to create trip plan at this time');
            }

            if (inputs.usersAccompanying.length > 0){
                for (let i=0; i<inputs.usersAccompanying; i++){
                    const friend = inputs.usersAccompanying[i];
                    const request = await axios.put(REQUEST_TO_JOIN, {username: friend, tripId: data.data._id});
                    if (!request){
                        setIsLoading(false);
                        return setError('Unable to send join requests at this time');
                    }
                }
            }

            setIsLoading(false);
            history.push(`/tripPlan/${data.data._id}`);
        }
        catch (e){
            setIsLoading(false);
            setError('Unable to connect to the server');
        }
    }

    const fetchUser = async () => {
        setIsLoading(true);
        const userRes = await getMe();
        setUser(userRes);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchUser().catch(() => setIsLoading(false));
    }, [])

    return(
        <Fragment>
            <LoadingSpinner isLoading={isLoading}/>
            <PlanTripLayout
                title={<span>Let's <b>finish</b> it!</span>}
                error={error}
                setError={setError}
                progress={progress}
                action={generateTrip}
                actionText={'Finish'}
                clickBack={clickBack}
                inputs={inputs}
                description={"That's all we need. Select your plan privacy and click Finish to view your newly created plan"}
            >
                <div className={'PTGridContainer'}>
                    <select className={'PTInput'} value={inputs.privacy} onChange={e => setInputs({...inputs, privacy: e.target.value})}>
                        <option value={'private'}>Private</option>
                        <option value={'friends'}>Friends</option>
                        <option value={'public'}>Public</option>
                    </select>
                </div>

                <p style={{fontSize: '0.8rem', background: 'white', color: 'rgba(0, 0, 0, 0.5)', padding: '2% 1%', marginTop: '5%'}}>To view common meeting points, you must set your plan privacy as public</p>
            </PlanTripLayout>
        </Fragment>
    )
}

export default PTFinish;
