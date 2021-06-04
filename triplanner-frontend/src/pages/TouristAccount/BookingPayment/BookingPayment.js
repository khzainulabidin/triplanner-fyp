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
import {formatDate} from "../../../utils/misc";
import {Fade} from "react-reveal";

const BookingPayment = () => {
    const params = useParams();
    const {type, checkIn, checkOut, hotelId} = params;

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
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [payment, setPayment] = useState(0);
    const [textError, setTextError] = useState('');
    const [success, setSuccess] = useState(false);

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
            });

            const index = hotel.rooms.findIndex(room => room.type === type);
            let days = moment(Number(checkOut)).diff(moment(Number(checkIn)), 'days');
            days = days > 0 ? days : 1;

            setPayment(Number(hotel.rooms[index].price) * Number(days));
            setIsLoading(false);
        }
        catch (e){
            setIsLoading(false);
        }
    }

    const bookRoom = () => {
        const {phone, guests} = input;

        if (guests === '' || phone === ''){
            return setTextError('All fields are required');
        }

        if (!isValidPhone(phone) || !isValidNumber(guests)){
            return setTextError('Enter valid input');
        }

        if (Number(guests) < 1 || Number(guests) > 4){
            return setTextError('Maximum 4 guests are allowed per booking');
        }

        const data = {...input, status: 'Confirmed', paymentMethod: 'Cash on arrival', payment};
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

                                <input type={'text'} placeholder={'Payment Option'}
                                       value={'Cash on arrival'}
                                       style={{textTransform: 'capitalize'}}
                                       disabled
                                />

                                <span
                                    style={{margin: '2% 0 5% 0'}}>Total payment on arrival: <b>PKR {payment}</b></span>
                                <input type={'submit'} value={'Book Room'} disabled={input.guests === ''} onClick={bookRoom}/>
                            </div>
                        </div>

                        <div className={styles.icon}>
                            <img src={icon} alt={'icon'}/>
                        </div>
                    </div>
                </div>
            </div></Fade>}
        </Fragment>
    );
};

export default BookingPayment;
