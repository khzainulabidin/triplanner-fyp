import styles from './BookRoom.module.css';
import NavBar from "../../../components/NavBar/NavBar";
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import DateTimePicker from "react-datetime-picker";
import {Fade} from "react-reveal";

const BookRoom = () => {
    const [input, setInput] = useState({
        checkIn: new Date(),
        checkOut: ''
    });
    const [destination, setDestination] = useState('');
    const [maxCheckIn, setMaxCheckIn] = useState('');
    const [minCheckOut, setMinCheckOut] = useState('');
    const [maxCheckOut, setMaxCheckOut] = useState('');

    useEffect(() => {
        const checkinMax = new Date();
        checkinMax.setDate(checkinMax.getDate()+3);
        setMaxCheckIn(checkinMax);
        setMinCheckOut(input.checkIn);

        const checkoutMax = new Date(input.checkIn);
        checkoutMax.setDate(checkoutMax.getDate()+14);
        setMaxCheckOut(checkoutMax);
    }, [input.checkIn]);

    const history = useHistory();

    const searchRooms = () => {
        if (destination !== '' && input.checkIn !== '' && input.checkOut !== ''){
            history.push(encodeURI(`/roomSearchResults/${destination.label}/${new Date(input.checkIn).getTime()}/${new Date(input.checkOut).getTime()}`));
        }
    }

    const placeholder = 'Where are you going?';

    return(
        <Fade>
            <div className={styles.bookRoom}>
                <NavBar/>

                <Fade>
                    <div className={styles.searchContainer}>
                        <div className={styles.searchBox}>
                            <div className={styles.inputs}>

                                <div className={styles.inputContainer}>
                                    <label htmlFor={'destination'}>Destination</label>

                                    <GooglePlacesAutocomplete
                                        apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                                        onLoadFailed={() => console.log("")}
                                        autocompletionRequest={{
                                            componentRestrictions: {
                                                country: ['pk'],
                                            },
                                            types: ['(cities)']
                                        }}
                                        selectProps={{
                                            destination,
                                            onChange: setDestination,
                                            types: ['cities'],
                                            styles: {
                                                container: (provided) => ({
                                                    ...provided,
                                                    height: '45px',
                                                    width: window.innerWidth >= 768 ? '90%' : '100%',
                                                    position: 'relative',
                                                    borderRadius: '10px',
                                                }),
                                                indicatorsContainer: (provided) => ({
                                                    ...provided,
                                                    background: 'transparent',
                                                    color: 'transparent',
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
                                                    height: '45px',
                                                    boxShadow: window.innerWidth >= 768 ? '0 0 10px rgba(0, 0, 0, 0.1)' : '0 0 2px rgba(0, 0, 0, 0.2)',
                                                    border: '0 none',
                                                    outline: '0 none',
                                                    borderRadius: '10px',
                                                    padding: '0 2%',
                                                    fontSize: '0.85rem',
                                                    cursor: 'text',
                                                }),
                                                input: (provided) => ({
                                                    ...provided,
                                                    cursor: 'text',
                                                }),
                                                option: (provided) => ({
                                                    ...provided,
                                                    color: '#434141',
                                                    cursor: 'pointer',
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
                                </div>

                                <div className={styles.inputContainer}>
                                    <label htmlFor={'roomSearchCheckIn'}>Check In</label>
                                    <DateTimePicker
                                        onChange={dateTime => setInput({...input, checkIn: dateTime})}
                                        value={input.checkIn}
                                        className={styles.input}
                                        disableClock={true}
                                        minDate={new Date()}
                                        maxDate={maxCheckIn}
                                    />
                                </div>

                                <div className={styles.inputContainer}>
                                    <label htmlFor={'roomSearchCheckOut'}>Check Out</label>
                                    <DateTimePicker
                                        onChange={dateTime => setInput({...input, checkOut: dateTime})}
                                        value={input.checkOut}
                                        className={styles.input}
                                        disableClock={true}
                                        minDate={minCheckOut}
                                        maxDate={maxCheckOut}
                                    />
                                </div>
                            </div>

                            <button
                                className={styles.searchBtn}
                                onClick={searchRooms}
                                disabled={destination==='' || input.checkIn === '' || input.checkOut===''}
                            >Search for rooms</button>
                        </div>
                    </div>
                </Fade>
            </div>
        </Fade>
    );
}

export default BookRoom;
