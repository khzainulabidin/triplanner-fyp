import React, {useState} from "react";
import styles from './JumboForm.module.css';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const JumboForm = ({placeholder, btnContent}) => {
    const [value, setValue] = useState('');

    return(
        /*<form className={styles.jumboForm_form}>

            <input
                type={'text'}
                className={styles.jumboForm_input}
                placeholder={placeholder}
            />
            <button className={styles.jumboForm_btn}>
                {btnContent}
            </button>
        </form>*/

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
                        background: '#6C46BD !important',
                        color: 'transparent !important',
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        height: '100%',
                        width: '60px',
                        borderRadius: '0 10px 10px 20px',
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
                placeholder: 'Search for places',
            }}
            debounce={1000}
        />
    );
}

export default JumboForm