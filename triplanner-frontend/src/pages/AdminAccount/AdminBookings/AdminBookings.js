import axios from "axios";
import {BOOKINGS_ROUTE} from "../../../utils/routes";
import React, {useEffect, useRef, useState} from "react";
import MyTable from "../../../components/MyTable/MyTable";
import MyCard from "../../../components/MyCard/MyCard";
import style from "../../HotelAccount/Messages/Messages.module.css";
import NoUserWindow from "../../../components/NoUserWindow/NoUserWindow";
import moment from "moment";
import {formatDate} from "../../../utils/misc";
import BookingModal from "../../../components/BookingModal/BookingModal";
import AdminLayout from "../../../components/AdminLayout/AdminLayout";

const AdminBookings = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [bookings, setBookings] = useState([]);
    const [rows, setRows] = useState([]);

    function createData(name, hotel, checkin, status, details) {
        return {name, hotel, checkin, status, details};
    }

    const headCells = [
        { id: 'name', numeric: false, disablePadding: true, label: 'Email' },
        { id: 'hotel', numeric: true, disablePadding: false, label: 'Room Type' },
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
                booking.name,
                booking.hotel,
                formatDate(booking.checkIn),
                (<p style={{color: getColor(booking.status)}}>{booking.status}</p>),
                (<BookingModal booking={booking} setIsLoading={setIsLoading} fetchUser={fetchUser} type={'admin'}/>),
            ));
        }
        setRows(localRows);
        //eslint-disable-next-line
    }, [bookings]);

    const fetchUser = async () => {
        try {
            setIsLoading(true);
            const res = await axios.get(BOOKINGS_ROUTE, {headers: {'x-access-token': localStorage.getItem('token')}});
            const data = res.data;
            setBookings(data.data.reverse());
            setIsLoading(false);
        }
        catch (e){
            setBookings([]);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchUser().catch(() => setIsLoading(false));
        //eslint-disable-next-line
    }, []);

    return(
        <AdminLayout isLoading={isLoading}>
            {isLoading ? null : bookings ? bookings.length > 0 ?
                <MyTable rows={rows} headCells={headCells} type={'adminBookings'}/> :
                <div style={{width: '100%'}}>
                    <MyCard>
                        <p className={style.noMessages}>No bookings yet</p>
                    </MyCard></div> :
                <div className={'noUserContainer'}><NoUserWindow/></div>
            }
        </AdminLayout>
    );
}

export default AdminBookings;
