import style from './RoomCard.module.css';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from '@material-ui/icons/Add';
import React, {useState} from "react";
import axios from "axios";
import {BUSINESS_ROOM} from "../../utils/routes";
import {Link} from "react-router-dom";

const RoomCard = ({room, deleteRoom, popError, readOnly, selectRoomLink}) => {
    const [roomObject, setRoomObject] = useState(room);
    const {number_of_rooms, type, price, fixedTotal} = roomObject;

    const increment = () => {
        const newRoom = {...roomObject, number_of_rooms: Number(number_of_rooms)+1};
        setRoomObject(newRoom);
        updateRoomOnServer(newRoom, 'inc');
    }

    const decrement = () => {
        if (roomObject.number_of_rooms > 0){
            const newRoom = {...roomObject, number_of_rooms: Number(number_of_rooms)-1};
            setRoomObject(newRoom);
            updateRoomOnServer(newRoom, 'dec');
        }
        else {
            deleteRoom(type);
        }
    }

    const updateRoomOnServer = (newRoom, action) => {
        axios.put(BUSINESS_ROOM, {type: newRoom.type, number_of_rooms: newRoom.number_of_rooms, action}, {headers: {
                'x-access-token': localStorage.getItem('token')
            }}).then(res => {
            const data = res.data;
            if (!data.success){
                popError(data.data);
            }
        }).catch(() => {
            popError('Unable to update room');
        });
    }

    return(
        <div className={style.card}>
            {!readOnly && <div className={style.rooms}>
                {number_of_rooms > 0 && <p className={style.icon} onClick={decrement}><RemoveIcon fontSize={"small"}/></p>}
                <span className={style.cardStat}>{number_of_rooms}</span>
                {number_of_rooms < fixedTotal && <p className={style.icon} onClick={increment}><AddIcon fontSize={"small"}/></p>}
            </div>}

            <p style={{
                textTransform: 'capitalize',
                fontSize: readOnly ? window.innerWidth >= 768 ? '1.5rem' : '1.2rem' : '0.9rem',
                marginTop: readOnly ? window.innerWidth >= 768 ? '30px' : '10px' : '10px'
            }}>{type}</p>
            <span className={style.cardPrice}>PKR {price}</span>

            {!readOnly && <div className={style.cardActions}>
                <span onClick={() => deleteRoom(type)}><DeleteIcon
                    style={{fontSize: '15px', cursor: 'pointer'}}/></span>
            </div>}

            {!readOnly && <p style={{fontSize: '0.8rem'}}>Total rooms: {fixedTotal}</p>}

            {readOnly && <Link to={selectRoomLink} className={style.selectRoom}>Select this room type</Link>}
        </div>
    );
}

export default RoomCard;
