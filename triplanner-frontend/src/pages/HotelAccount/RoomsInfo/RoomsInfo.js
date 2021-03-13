import React, {Fragment, useState} from "react";
import LogoNavbar from "../../../components/LogoNavbar/LogoNavbar";
import styles from './RoomsInfo.module.css';
import RoomInfoFieldWidget from "../../../components/RoomInfoFieldWidget/RoomInfoFieldWidget";
import {Button} from "@material-ui/core";
import {useSelector} from "react-redux";
import {selectToken} from "../../../redux/slices/user/user";
import axios from "axios";
import {useHistory} from "react-router-dom";

const RoomsInfo = () => {
    const [singleRooms, setSingleRooms] = useState(0);
    const [singlePrice, setSinglePrice] = useState(0);
    const [doubleRooms, setDoubleRooms] = useState(0);
    const [doublePrice, setDoublePrice] = useState(0);
    const [tripleRooms, setTripleRooms] = useState(0);
    const [triplePrice, setTriplePrice] = useState(0);
    const [quadRooms, setQuadRooms] = useState(0);
    const [quadPrice, setQuadPrice] = useState(0);

    const token = useSelector(selectToken);
    let history = useHistory();

    const api = axios.create({
        baseURL: `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_API_BUSINESS_ROUTE}/saveRoomsInfo`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const rooms = [
        {type: 'single', numberOfRooms: singleRooms, price: singlePrice},
        {type: 'double', numberOfRooms: doubleRooms, price: doublePrice},
        {type: 'triple', numberOfRooms: tripleRooms, price: triplePrice},
        {type: 'quad', numberOfRooms: quadRooms, price: quadPrice}
    ]

    const saveRoomsInfo = e => {
        e.preventDefault();
        api.put('/', {rooms}).then(res => {
            if (res.data.success){
                history.push('/hotelFacilities');
        }}).catch(err => console.log(err.message));
    }

    const disableContinue = (singleRooms === 0 && doubleRooms === 0 && tripleRooms === 0 && quadRooms === 0)
        || (singlePrice === 0 && doublePrice === 0 && triplePrice === 0 && quadPrice === 0);

    return(
        <Fragment>
            <LogoNavbar/>
            <div className={styles.container}>
                <h1>Add Rooms</h1>

                <div className={styles.fieldsContainer}>
                    <RoomInfoFieldWidget
                        type={'single'}
                        rooms={singleRooms}
                        price={singlePrice}
                        setRooms={setSingleRooms}
                        setPrice={setSinglePrice}
                    />

                    <RoomInfoFieldWidget
                        type={'double'}
                        rooms={doubleRooms}
                        price={doublePrice}
                        setRooms={setDoubleRooms}
                        setPrice={setDoublePrice}
                    />

                    <RoomInfoFieldWidget
                        type={'triple'}
                        rooms={tripleRooms}
                        price={triplePrice}
                        setRooms={setTripleRooms}
                        setPrice={setTriplePrice}
                    />

                    <RoomInfoFieldWidget
                        type={'quad'}
                        rooms={quadRooms}
                        price={quadPrice}
                        setRooms={setQuadRooms}
                        setPrice={setQuadPrice}
                    />
                </div>

                <Button
                    color="secondary"
                    onClick={saveRoomsInfo}
                    disabled={disableContinue}
                >Continue</Button>
            </div>
        </Fragment>
    );
}

export default RoomsInfo;