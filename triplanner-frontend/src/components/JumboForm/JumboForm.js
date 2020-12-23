import React, {useState} from "react";
import styles from './JumboForm.module.css';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import {setPlace} from "../../redux/slices/explore/nearbyPlaces";
import {useHistory} from "react-router";
import {useDispatch} from "react-redux";
import axios from "axios";

const JumboForm = ({placeholder, btnContent}) => {
    const [value, setValue] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();

    const search = () => {
        const api = axios.create({
            baseURL: 'http://localhost:5000/placeDetailsProxy'
        });

        api.post('/', {
            place_id: value.value.place_id,
        }).then(res => {
            dispatch(setPlace(res.data.response.result));
            window.scrollTo(0, 0);
            history.push('/placeDetail');
        }).catch(err => console.log(err.message));
    }

    return(
        <div className={styles.jumboForm}>
            <GooglePlacesAutocomplete
                apiKey={process.env.REACT_APP_GOOGLE_PLACES_API_KEY}
                selectProps={{
                    value,
                    onChange: setValue,
                    styles: {
                        container: (provided) => ({
                            ...provided,
                            height: '60px',
                            width: '50%',
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
                            height: '60px',
                            border: '0 none',
                            outline: '0 none',
                            fontSize: '18px',
                            padding: '3px 40px 3px 20px',
                            borderRadius: '10px',
                            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
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
            <button className={styles.jumboForm_btn} onClick={search}>
                {btnContent}
            </button>
        </div>
    );
}

export default JumboForm