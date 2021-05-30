import React, {useState} from "react";
import styles from './JumboForm.module.css';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import {openPlaceDetail} from "../../utils/misc";

const JumboForm = ({placeholder, btnContent}) => {
    const [value, setValue] = useState('');

    const search = () => {
        if (value.value.place_id !== null){
            openPlaceDetail(value.value.place_id);
        }
    }

    return(
        <div className={styles.jumboForm}>
            <GooglePlacesAutocomplete
                apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                onLoadFailed={() => {}}
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
