import React, {useState} from "react";
import styles from './HotelInfo.module.css';
import {TextField, FormControlLabel, Switch, Button} from "@material-ui/core";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectToken} from "../../../redux/slices/user/user";
import axios from "axios";
import LogoNavbar from "../../../components/LogoNavbar/LogoNavbar";

const HotelInfo = () => {
    const [name, setName] = useState('');
    const [rating, setRating] = useState('');
    const [phone, setPhone] = useState('');
    const [liveChatFeature, setLiveChatFeature] = useState(false);
    const [address, setAddress] = useState('');
    const [cityObj, setCityObj] = useState('');
    const [zip, setZip] = useState('');

    const placeholder = 'City *';
    let history = useHistory();

    const token = useSelector(selectToken);

    const api = axios.create({
        baseURL: `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_API_BUSINESS_ROUTE}/saveBusinessDetails`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const saveHotelDetails = e => {
        e.preventDefault();
        const city = cityObj.label;
        api.post('/', {name, rating, phone, liveChatFeature, address, city, zip}).then(res => {
            if (res.data.success){
                history.push('/roomsInfo');
            }
        }).catch(err => console.log(err.message));
    }

    return (
        <div className={styles.hotelDetails}>
            <LogoNavbar/>

            <form className={styles.hotelDetailsContentContainer}>
                <div>
                    <TextField
                        style={{width: '70%'}}
                        label={'Business Name'}
                        type={'text'}
                        value={name}
                        onChange={e => setName(e.target.value)}
                        name={'business_name'}
                        required
                    />

                    <TextField
                        style={{width: '70%'}}
                        label={'Star Rating'}
                        type={'number'}
                        value={rating}
                        onChange={e => setRating(e.target.value)}
                        name={'star_rating'}
                        required
                    />

                    <h1>Contact Details</h1>

                    <TextField
                        style={{width: '70%'}}
                        label={'Phone'}
                        type={'tel'}
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        name={'phone'}
                        required
                    />

                    <div>
                        <FormControlLabel
                            control={<Switch
                                checked={liveChatFeature}
                                onChange={() => setLiveChatFeature(!liveChatFeature)}
                                name="live_chat_feature"
                            />}
                            label="Enable Live Chat Feature"
                        />
                    </div>
                </div>

                <div>
                    <h1>Address Details</h1>

                    <TextField
                        style={{width: '70%'}}
                        label={'Street Address'}
                        type={'text'}
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        name={'street_address'}
                        required
                    />

                    <GooglePlacesAutocomplete
                        apiKey={process.env.REACT_APP_GOOGLE_PLACES_API_KEY}
                        apiOptions={{region: 'pk' }}
                        selectProps={{
                            cityObj,
                            onChange: setCityObj,
                            styles: {
                                container: (provided) => ({
                                    ...provided,
                                    height: '50px',
                                    width: '70%',
                                    position: 'relative',
                                    borderRadius: '10px',
                                    border: '2px solid #DDD',
                                    marginBottom: '30px',
                                    zIndex: '999'
                                }),
                                indicatorsContainer: (provided) => ({
                                    ...provided,
                                    background: 'transparent !important',
                                    color: 'transparent !important',
                                }),
                                dropdownIndicator: (provided) => ({
                                    ...provided,
                                    background: 'transparent !important',
                                    color: 'transparent !important',
                                }),
                                indicatorSeparator: (provided) => ({
                                    ...provided,
                                    background: 'transparent !important',
                                    color: 'transparent !important',
                                }),
                                control: (provided) => ({
                                    ...provided,
                                    height: '50px',
                                    border: '0 none',
                                    outline: '0 none',
                                    fontSize: '18px',
                                    padding: '3px 40px 3px 20px',
                                    borderRadius: '10px',
                                }),
                                input: (provided) => ({
                                    ...provided,
                                    cursor: 'text',
                                }),
                                option: (provided) => ({
                                    ...provided,
                                    color: '#434141',
                                    cursor: 'pointer',
                                    zIndex: '999'
                                }),
                                singleValue: (provided) => ({
                                    ...provided,
                                    color: '#434141',
                                }),
                            },
                            placeholder,
                        }}
                        debounce={1000}
                        withSessionToken
                    />

                    <TextField
                        style={{width: '70%'}}
                        label={'Zip Code'}
                        type={'text'}
                        value={zip}
                        onChange={e => setZip(e.target.value)}
                        name={'zip_code'}
                        required
                    />

                    <div>
                        <Button type={"submit"} color="secondary" onClick={saveHotelDetails}>Continue</Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default HotelInfo;