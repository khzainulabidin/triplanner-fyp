import axios from "axios";
import {GET_ALL_TRIPS, TRIPS_ROUTE} from "../../../utils/routes";
import React, {useEffect, useRef, useState} from "react";
import MyTable from "../../../components/MyTable/MyTable";
import MyCard from "../../../components/MyCard/MyCard";
import style from "../../HotelAccount/Messages/Messages.module.css";
import NoUserWindow from "../../../components/NoUserWindow/NoUserWindow";
import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import AdminTripsModal from "../../../components/AdminTripsModal/AdminTripsModal";

const AdminTrips = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [trips, setTrips] = useState([]);
    const [rows, setRows] = useState([]);

    function createData(source, destination, details, deleteTrip) {
        return {source, destination, details, deleteTrip};
    }

    const headCells = [
        { id: 'source', numeric: false, disablePadding: true, label: 'Source' },
        { id: 'destination', numeric: true, disablePadding: false, label: 'Destination' },
        { id: 'details', numeric: true, disablePadding: false, label: 'Details' },
        { id: 'deleteTrip', numeric: true, disablePadding: false, label: 'Delete' },
    ];

    const firstUpdate = useRef(true);
    useEffect(() => {
        if (firstUpdate.current){
            return firstUpdate.current = false;
        }

        let localRows = [];

        for(let i=0; i<trips.length; i++){
            const trip = trips[i];
            localRows.push(createData(
                trip.source.name,
                trip.destinations[trip.destinations.length-1].name,
                (<AdminTripsModal trip={trip}/> ),
                (<p onClick={() => deleteTrip(trip._id)} style={{color: '#04B6A9', cursor: 'pointer'}}>Delete</p> ),
            ));
        }
        setRows(localRows);
        //eslint-disable-next-line
    }, [trips]);

    const deleteTrip = async id => {
        try {
            setIsLoading(true);
            const res = await axios.delete(`${TRIPS_ROUTE}/${id}`, {headers: {'x-access-token': localStorage.getItem('token')}});
            const data = res.data;
            setIsLoading(false);
            if (!data.success){
                return;
            }
            fetchUser().catch(() => setIsLoading(false));
        }
        catch (e){
            setIsLoading(false);
        }
    }

    const fetchUser = async () => {
        try {
            setIsLoading(true);
            const res = await axios.get(GET_ALL_TRIPS, {headers: {'x-access-token': localStorage.getItem('token')}});
            const data = res.data;
            setTrips(data.data.reverse());
            setIsLoading(false);
        }
        catch (e){
            setTrips([]);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchUser().catch(() => setIsLoading(false));
        //eslint-disable-next-line
    }, []);

    return(
        <AdminLayout isLoading={isLoading}>
            {isLoading ? null : trips ? trips.length > 0 ?
                <MyTable rows={rows} headCells={headCells} type={'adminTrips'}/> :
                <div style={{width: '100%'}}>
                    <MyCard>
                        <p className={style.noMessages}>No trips found</p>
                    </MyCard></div> :
                <div className={'noUserContainer'}><NoUserWindow/></div>
            }
        </AdminLayout>
    );
}

export default AdminTrips;
