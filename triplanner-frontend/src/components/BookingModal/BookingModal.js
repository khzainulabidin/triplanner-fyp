import React, {Fragment, useState} from "react";
import MyModal from "../MyModal/MyModal";
import styles from './BookingModal.module.css';
import axios from "axios";
import {BOOKINGS_ROUTE, BUSINESS_BOOKING} from "../../utils/routes";
import {formatDate} from "../../utils/misc";

const BookingModal = ({booking, setIsLoading, fetchUser, type, hotelId}) => {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');

    const checkoutBooking = () => {
        setIsLoading(true);
        const statusUpdate = type === 'tourist' ? 'Cancelled' : 'Expired';
        axios.put(BUSINESS_BOOKING, {id: booking._id, statusUpdate, hotelId}, {headers: {
            'x-access-token': localStorage.getItem('token')
        }}).then(res => {
            setIsLoading(false);
            const data = res.data;
            if (!data){
                return setError(data.data);
            }

            setOpen(false);
            fetchUser();
        }).catch(() => {
            setError('Unable to update booking');
            setIsLoading(false);
        })
    }

    const deleteBooking = async () => {
        try {
            const res = await axios.delete(`${BOOKINGS_ROUTE}/${booking._id}`, {headers: {'x-access-token': localStorage.getItem('token')}});
            const data = res.data;
            if (!data.success){
                setIsLoading(false);
                return setError('Unable to delete booking');
            }
            setIsLoading(false);
            setOpen(false);
            fetchUser();
        }
        catch (e){
            setIsLoading(false);
            return setError('Unable to delete booking');
        }
    }

    return(
        <Fragment>
            <p onClick={() => setOpen(true)} style={{color: '#04B6A9', cursor: "pointer"}}>View</p>
            <MyModal open={open} setOpen={setOpen}
                     actionText={type === 'tourist' ? 'Cancel Booking' : type === 'business' ? 'Check out' : 'Delete booking'}
                     action={type === 'admin' ? deleteBooking : checkoutBooking}
                     disabled={type !== 'admin' && (booking.status === 'Cancelled' || booking.status === 'Expired')}
            >
                <div className={styles.modal}>
                    <p>{error}</p>
                    <h4 style={{fontSize: '1.3rem', fontWeight: '300', marginBottom: '5%'}}><b>Total payment: PKR {booking.payment}</b></h4>
                    <p><b>Name: </b>{booking.name}</p>
                    <p><b>Email: </b>{booking.email}</p>
                    <p><b>Phone: </b>{booking.phone}</p>
                    <p><b>Number of guests: </b>{booking.guests}</p>
                    <p><b>Room type: </b><span style={{textTransform: 'capitalize'}}>{booking.roomType}</span></p>
                    <p><b>Status: </b>{booking.status}</p>
                    <p><b>Payment Method: </b>{booking.paymentMethod}</p>
                    <p><b>Check in: </b>{formatDate(booking.checkIn)}</p>
                    <p><b>Check out: </b>{formatDate(booking.checkOut)}</p>
                </div>
            </MyModal>
        </Fragment>
    );
}

export default BookingModal;
