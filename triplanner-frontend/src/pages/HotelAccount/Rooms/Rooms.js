import React, {useState, Fragment, useEffect} from "react";
import style from './Rooms.module.css';
import BusinessLayout from "../../../components/BusinessLayout/BusinessLayout";
import AddIcon from '@material-ui/icons/Add';
import RoomCard from "../../../components/RoomCard/RoomCard";
import AddRoomModal from "../../../components/AddRoomModal/AddRoomModal";
import axios from "axios";
import {BUSINESS_ROOMS} from "../../../utils/routes";
import {Fade} from "react-reveal";
import {getMe} from "../../../utils/auth";
import NoUserWindow from "../../../components/NoUserWindow/NoUserWindow";

const Rooms = () => {
    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [availableTypes, setAvailableTypes] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        getMe().then(user => {
            setUser(user);
            if (user.rooms){
                setRooms(user.rooms.reverse());
            }
            if (user.availableTypes){
                setAvailableTypes(user.availableTypes);
            }
            setIsLoading(false);
        }).catch(() => {
            setIsLoading(false);
            setUser(null);
        });
        //eslint-disable-next-line
    }, []);

    const popError = err => {
        setError(err);
        setTimeout(() => {
            setError('');
        }, 4000);
    }

    const addRoom = async (type, number_of_rooms, price, fixedTotal) => {
        const newRoom = {type, number_of_rooms, price, fixedTotal};
        const newRooms = [...rooms, newRoom];
        const newAvailableTypes = [...availableTypes, type];
        updateRoomsOnServer(newRooms, newAvailableTypes, 'add', newRoom);
    }

    const deleteRoom = type => {
        const newRoom = rooms.find(room => room.type === type);
        const newRooms = rooms.filter(room => room.type !== type);
        const newAvailableTypes = availableTypes.filter(item => item !== type);
        updateRoomsOnServer(newRooms, newAvailableTypes, 'delete', newRoom);
    }

    const updateRoomsOnServer = (newRooms, newAvailableTypes, action, newRoom='') => {
        setIsLoading(true);
        axios.put(BUSINESS_ROOMS, {rooms: newRooms, availableTypes: newAvailableTypes, action, newRoom}, {headers: {
                'x-access-token': localStorage.getItem('token')
        }}).then(res => {
            setIsLoading(false);
            const data = res.data;
            if (!data.success){
                return popError(data.data);
            }
            setError('');
            setRooms(newRooms);
            setAvailableTypes(newAvailableTypes);
            window.location.reload();
        }).catch(() => {
            setIsLoading(false);
            popError('Cannot update rooms');
        });
    }

    return(
        <BusinessLayout isLoading={isLoading}>
            {isLoading ? null : user ? (
                <Fragment>
                    {error && <Fade><p className={style.error}>{error}</p></Fade>}
                    {rooms.map((room, index) => (
                        <RoomCard room={room} key={index} deleteRoom={deleteRoom} popError={popError}/>
                    ))}

                    <div className={style.card} onClick={() => setOpen(true)}>
                        <AddIcon fontSize={'large'}/>
                        <p>Add Rooms</p>
                    </div>

                    <AddRoomModal open={open} setOpen={setOpen} availableTypes={availableTypes} addRoom={addRoom}/>
                </Fragment>) : <Fade><div className={'noUserContainer'}><NoUserWindow/></div></Fade>}
        </BusinessLayout>
    );
};

export default Rooms;
