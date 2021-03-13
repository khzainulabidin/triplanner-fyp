import React, {useState} from "react";
import styles from './HotelFacilities.module.css';
import LogoNavbar from "../../../components/LogoNavbar/LogoNavbar";
import {Button, InputLabel, TextField} from "@material-ui/core";
import FacilitiesBox from "../../../components/FacilitiesBox/FacilitiesBox";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectToken} from "../../../redux/slices/user/user";
import axios from "axios";

const HotelFacilities = () => {
    const [facilities, setFacilities] = useState([]);
    const [checkIn, setCheckIn] = useState('');
    const [checkout, setCheckout] = useState('');

    let history = useHistory();
    const token = useSelector(selectToken);

    const api = axios.create({
        baseURL: `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_API_BUSINESS_ROUTE}/saveHotelFacilities`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const saveFacilities = () => {
        api.put('/', {facilities, checkIn, checkout}).then(res => {
            if (res.data.success){
                history.push('/business');
            }
        }).catch(err => console.log(err.message));
    }

    const checkFacility = facility => {
        return facilities.includes(facility);
    }

    const addFacility = facility => {
        if (facilities.includes(facility)){
            setFacilities(facilities.filter(item => item !== facility));
        }
        else {
            setFacilities([...facilities, facility]);
        }
    }

    return(
        <div>
            <LogoNavbar/>
            <div className={styles.container}>
                <h1>Facilities</h1>

                <div style={{marginBottom: '2%'}}>
                    <FacilitiesBox addFacility={addFacility} checkFacility={checkFacility} facility={'parking'}/>
                    <FacilitiesBox addFacility={addFacility} checkFacility={checkFacility} facility={'breakfast'}/>
                    <FacilitiesBox addFacility={addFacility} checkFacility={checkFacility} facility={'free wifi'}/>
                    <FacilitiesBox addFacility={addFacility} checkFacility={checkFacility} facility={'restaurant'}/>
                    <FacilitiesBox addFacility={addFacility} checkFacility={checkFacility} facility={'room service'}/>
                    <FacilitiesBox addFacility={addFacility} checkFacility={checkFacility} facility={'24 hour front-desk'}/>
                    <FacilitiesBox addFacility={addFacility} checkFacility={checkFacility} facility={'fitness center'}/>
                    <FacilitiesBox addFacility={addFacility} checkFacility={checkFacility} facility={'garden'}/>
                    <FacilitiesBox addFacility={addFacility} checkFacility={checkFacility} facility={'family rooms'}/>
                    <FacilitiesBox addFacility={addFacility} checkFacility={checkFacility} facility={'swimming pool'}/>
                    <FacilitiesBox addFacility={addFacility} checkFacility={checkFacility} facility={'air conditioning'}/>
                    <FacilitiesBox addFacility={addFacility} checkFacility={checkFacility} facility={'backup generator'}/>
                </div>

                <h1>Hotel Policies</h1>

                <div className={styles.policies}>
                    <div>
                        <InputLabel htmlFor={'checkin'} style={{marginBottom: '4%'}}>Check In</InputLabel>
                        <TextField
                            id={'checkin'}
                            type={'time'}
                            name={'checkin'}
                            value={checkIn}
                            onChange={e => setCheckIn(e.target.value)}
                            required
                        />
                    </div>

                    <div style={{marginLeft: '4%'}}>
                        <InputLabel htmlFor={'checkout'} style={{marginBottom: '4%'}}>Check Out</InputLabel>
                        <TextField
                            id={'checkout'}
                            type={'time'}
                            value={checkout}
                            onChange={e => setCheckout(e.target.value)}
                            name={'checkout'}
                            required
                        />
                    </div>

                </div>

                <Button style={{width: '20%'}} color="secondary" onClick={saveFacilities}>Continue</Button>
            </div>
        </div>
    );
}

export default HotelFacilities;