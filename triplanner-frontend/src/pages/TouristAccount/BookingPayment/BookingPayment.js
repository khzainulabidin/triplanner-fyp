import styles from './BookingPayment.module.css';
import NavBar from "../../../components/NavBar/NavBar";
import React, {useEffect, useState, Fragment} from "react";
import RemoveIcon from '@material-ui/icons/Remove';
import icon from '../../../assets/person_with_suitcase_icon.png';
import {useParams} from "react-router-dom";
import {getMe, getOtherProfile} from "../../../utils/auth";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import moment from "moment";
import {isValidNumber, isValidPhone} from "../../../utils/regex";
import axios from "axios";
import {BUSINESS_BOOK_ROOM} from "../../../utils/routes";
import ErrorPageLayout from "../../../components/ErrorPageLayout/ErrorPageLayout";
import success_icon from '../../../assets/success.svg';
import {createClientSecret, formatDate, processPayment} from "../../../utils/misc";
import {Fade} from "react-reveal";
import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";

const BookingPayment = () => {
    const params = useParams();
    const {type, checkIn, checkOut, hotelId, coa} = params;

    const [input, setInput] = useState({
        name: '',
        email: '',
        phone: '',
        guests: '',
        city: '',
        hotel: '',
        checkIn: '',
        checkOut: '',
        roomType: '',
        paymentMethod: 'Online Payment',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [payment, setPayment] = useState(0);
    const [textError, setTextError] = useState('');
    const [success, setSuccess] = useState(false);
    const [clientSecret, setClientSecret] = useState('');
    const [processingPayment, setProcessingPayment] = useState(false);

    const stripe = useStripe();
    const elements = useElements();

    const fetchDetails = async () => {
        try {
            setIsLoading(true);
            const hotel = await getOtherProfile(hotelId);
            const user = await getMe();

            if (!user || !hotel){
                return setError('Unable to fetch booking details');
            }

            setInput({
                name: user.name,
                email: user.email,
                phone: user.phone,
                guests: '',
                city: hotel.city,
                hotel: hotel.name,
                checkIn: checkIn,
                checkOut: checkOut,
                roomType: type,
                paymentMethod: 'Online Payment',
            });

            const index = hotel.rooms.findIndex(room => room.type === type);
            let days = moment(Number(checkOut)).diff(moment(Number(checkIn)), 'days');
            days = days > 0 ? days : 1;

            const localPayment = Number(hotel.rooms[index].price) * Number(days);
            setPayment(localPayment);

            const clientSecretData = await createClientSecret(localPayment);
            if (!clientSecretData){
                return setError('Unable to book room at this time. Try reloading the page');
            }
            setClientSecret(clientSecretData);

            setIsLoading(false);
        }
        catch (e){
            setIsLoading(false);
        }
    }

    const isValidNumberOfGuests = () => {
        switch (type){
            case 'single':
                return 2;
            case 'double':
                return 2;
            case 'triple':
                return 3;
            case 'quad':
                return 4;
            case 'queen':
                return 2;
            case 'king':
                return 2;
            case 'twin':
                return 2;
            case 'double-double':
                return 4;
            case 'studio':
                return 6;
            case 'master suite':
                return 8;
            case 'junior suite':
                return 6;
            case 'connecting room':
                return 6;
            case 'adjoining room':
                return 6;
            case 'adjacent room':
                return 6;
            default:
                return 2;
        }
    }

    const bookRoom = async () => {
        setTextError('');
        const {phone, guests} = input;

        if (guests === '' || phone === ''){
            return setTextError('All fields are required');
        }

        if (!isValidPhone(phone) || !isValidNumber(guests)){
            return setTextError('Enter valid input');
        }

        if (Number(guests) < 1 || Number(guests) > 8){
            return setTextError('Maximum 8 guests are allowed per booking');
        }

        const maxGuests = isValidNumberOfGuests();
        if (maxGuests < Number(guests)){
            return setTextError(`Maximum ${maxGuests} guests are allowed for ${type} room`);
        }

        const paymentDetails = await processPayment(setProcessingPayment, clientSecret, stripe, elements);
        if (!paymentDetails){
            return setTextError('Payment failed. Please try again');
        }

        const data = {...input, status: 'Confirmed', payment, paymentDetails};
        setIsLoading(true);
        axios.post(BUSINESS_BOOK_ROOM, {booking: data, hotelId}, {headers: {
            'x-access-token': localStorage.getItem('token')
        }}).then(res => {
            const data = res.data;
            if (!data.success){
                return setTextError(data.data);
            }

            setTextError('');
            setSuccess(true);
            setIsLoading(false);
        })
    }

    useEffect(() => {
        fetchDetails().catch(() => setIsLoading(false));
        //eslint-disable-next-line
    }, [])

    return(
        <Fragment>
            <LoadingSpinner isLoading={isLoading}/>
            {isLoading ? null :
                error ? <ErrorPageLayout text={error}/> :
                    success ? <ErrorPageLayout text={'Booking successful!'} icon={success_icon}/> :
                        <Fade><div>
                <NavBar/>
                <div className={styles.bookingPayment}>
                    <div className={styles.container}>
                        <div>
                            <p>Confirm your booking details</p>
                            <span className={styles.error}>{textError}</span>

                            <div className={styles.inputs}>
                                <input type={'text'} placeholder={'Name'}
                                       value={input.name} onChange={e => setInput({...input, name: e.target.value})}/>
                                <div>
                                    <input type={'email'} placeholder={'Email'} disabled
                                           value={input.email}
                                           onChange={e => setInput({...input, email: e.target.value})}/>
                                    <input type={'tel'} placeholder={'Phone'}
                                           value={input.phone}
                                           onChange={e => setInput({...input, phone: e.target.value})}/>
                                </div>

                                <input type={'number'} placeholder={'Number of guests'} min={'1'} max={'4'}
                                       value={input.guests}
                                       onChange={e => setInput({...input, guests: e.target.value})}/>
                                <input type={'text'} placeholder={'City Name'} disabled
                                       value={input.city} onChange={e => setInput({...input, city: e.target.value})}/>
                                <input type={'text'} placeholder={'Hotel Name'} disabled
                                       value={input.hotel} onChange={e => setInput({...input, hotel: e.target.value})}/>

                                <div>
                                    <input
                                        type={'text'}
                                        value={formatDate(input.checkIn)}
                                        onChange={e => setInput({...input, checkIn: e.target.value})}
                                        placeholder={'Check In'}
                                        disabled
                                    />
                                    <span> <RemoveIcon fontSize={'large'} style={{color: '#EDEDED'}}/> </span>
                                    <input
                                        type={'text'}
                                        value={formatDate(input.checkOut)}
                                        onChange={e => setInput({...input, checkOut: e.target.value})}
                                        placeholder={'Check Out'}
                                        disabled
                                    />
                                </div>

                                <input type={'text'} placeholder={'Room Type'}
                                       value={input.roomType}
                                       onChange={e => setInput({...input, roomType: e.target.value})}
                                       style={{textTransform: 'capitalize'}}
                                       disabled
                                />

                                <select value={input.paymentMethod} onChange={e => setInput({...input, paymentMethod: e.target.value})}>
                                    <option value={'Online Payment'}>Online payment</option>
                                    {coa === '1' && <option value={'Cash on arrival'}>Cash on arrival</option>}
                                </select>
                            </div>

                            <p style={{margin: '2% 0 5% 0', fontSize: '1rem'}}>Total payment{input.paymentMethod === 'Cash on arrival' ? ' on arrival' : null}: <b>PKR {payment}</b></p>
                            {input.paymentMethod === 'Online Payment' && <div className={'cardElement'}>
                                <CardElement/>
                            </div>}
                            <button
                                className={styles.submitBtn}
                                disabled={input.guests === '' || processingPayment}
                                onClick={bookRoom}
                            >Book Room</button>
                        </div>

                        <div className={styles.icon}>
                            <img src={icon} alt={'icon'}/>
                        </div>
                    </div>
                </div>
            </div></Fade>}
        </Fragment>
    );
}

export default BookingPayment;
