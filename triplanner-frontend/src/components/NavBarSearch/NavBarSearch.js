import React, {useState} from "react";
import styles from "../NavBar/NavBar.module.css";
import {InputBase} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const NavBarSearch = () => {
    const [value, setValue] = useState('');

    return(
        <React.Fragment>
            {/*<InputBase
            placeholder={'Search'}
            style={{width: '100%'}}
        />
        <SearchIcon style={{color: 'rgba(0, 0, 0, 0.6)'}}/>*/}

            <GooglePlacesAutocomplete
                apiKey={process.env.REACT_APP_GOOGLE_PLACES_API_KEY}
                selectProps={{
                    value,
                    onChange: setValue,
                    styles: {
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
                    placeholder: 'Search',
                }}
                debounce={1000}
                withSessionToken
            />
        </React.Fragment>
    )
}

export default NavBarSearch;