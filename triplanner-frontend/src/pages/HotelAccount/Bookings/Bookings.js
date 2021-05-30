import BusinessLayout from "../../../components/BusinessLayout/BusinessLayout";
import React, {useEffect, useRef, useState} from "react";
import NoUserWindow from "../../../components/NoUserWindow/NoUserWindow";
import {getBookings} from "../../../utils/auth";
import MyTable from "../../../components/MyTable/MyTable";
import style from "../Messages/Messages.module.css";
import MyCard from "../../../components/MyCard/MyCard";
import BookingModal from "../../../components/BookingModal/BookingModal";
import moment from "moment";
import {formatDate} from "../../../utils/misc";

const Bookings = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [bookings, setBookings] = useState([]);
    const [rows, setRows] = useState([]);

    function createData(email, roomType, guests, checkin, status, details) {
        return {email, roomType, guests, checkin, status, details};
    }

    const headCells = [
        { id: 'email', numeric: false, disablePadding: true, label: 'Email' },
        { id: 'roomType', numeric: true, disablePadding: false, label: 'Room Type' },
        { id: 'guests', numeric: true, disablePadding: false, label: 'Guests' },
        { id: 'checkin', numeric: true, disablePadding: false, label: 'Check In' },
        { id: 'status', numeric: true, disablePadding: false, label: 'Status' },
        { id: 'details', numeric: true, disablePadding: false, label: 'Details' },
    ];

    const getColor = status => {
        switch (status){
            case 'Confirmed':
                return '#04B6A9';
            case 'Awaiting Checkout':
                return '#D4A013';
            case 'Expired':
                return '#DD5347';
            case 'Cancelled':
                return '#DD5347';
            default:
                return '#000000'
        }
    }

    const firstUpdate = useRef(true);
    useEffect(() => {
        if (firstUpdate.current){
            return firstUpdate.current = false;
        }

        let localRows = [];

        for(let i=0; i<bookings.length; i++){
            const booking = bookings[i];
            if ((moment(Number(booking.checkOut)).diff(moment(Number(booking.checkIn)), 'days')) < 0 && booking.status === 'Confirmed'){
                booking.status = 'Awaiting Checkout';
            }
            localRows.push(createData(
                booking.email,
                (<p style={{textTransform: 'capitalize'}}>{booking.roomType}</p>),
                booking.guests,
                formatDate(booking.checkIn),
                (<p style={{color: getColor(booking.status)}}>{booking.status}</p>),
                (<BookingModal booking={booking} setIsLoading={setIsLoading} fetchUser={fetchUser} type={'business'}/>),
            ));
        }
        setRows(localRows);
        //eslint-disable-next-line
    }, [bookings]);

    const fetchUser = async () => {
        setIsLoading(true);
        const bookingsRes = await getBookings('business');
        if (bookingsRes){
            setBookings(bookingsRes.reverse());
        }
        else {
            setBookings(false);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchUser().catch(() => setIsLoading(false));
        //eslint-disable-next-line
    }, []);

    return(
        <BusinessLayout isLoading={isLoading}>
            {isLoading ? null : bookings ? bookings.length > 0 ?
                <MyTable rows={rows} headCells={headCells} type={'bookings'}/> :
                <div style={{width: '100%'}}>
                    <MyCard>
                        <p className={style.noMessages}>No bookings yet</p>
                    </MyCard></div> :
                <div className={'noUserContainer'}><NoUserWindow/></div>
            }
        </BusinessLayout>
    );
}

export default Bookings;
