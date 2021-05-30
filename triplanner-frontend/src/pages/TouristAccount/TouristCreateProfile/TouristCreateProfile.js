import React, {useEffect, useState} from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {useHistory, useParams} from "react-router-dom";
import CreateProfileLayout from "../../../components/CreateProfileLayout/CreateProfileLayout";
import {updateProfileOnServer} from "../../../utils/auth";
import {TOURIST_PROFILE} from "../../../utils/routes";
import style from './TouristCreateProfile.module.css';
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {isValidPhone} from "../../../utils/regex";

const TouristCreateProfile = () => {
    const params = useParams();
    const {edit} = params;
    const [error, setError] = useState('');
    const [coverPhoto, setCoverPhoto] = useState(null);
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [input, setInput] = useState({
        gender: '',
        dob: '',
        phone: '',
    });
    const [city, setCity] = useState('');

    const history = useHistory();

    const updateProfile = async () => {
        const {gender, dob, phone} = input;
        if (gender === '' || dob === '' || city === '' || phone === ''){
            return setError('All fields are required');
        }
        if ((new Date(dob).getTime()) >= (new Date()-157680000000)){
            return setError('Invalid date of birth');
        }
        if (!isValidPhone(phone)){
            return setError('Invalid phone number');
        }

        const pathToPush = edit === 'edit' ? '/profile' : '/account/interests';
        updateProfileOnServer(profilePhoto, coverPhoto, setError, setIsLoading, {...input, city: city.label}, history, TOURIST_PROFILE, pathToPush).catch(() => {
            setIsLoading(false)}
        );
    }

    useEffect(() => {
        const dateMax = new Date();
        dateMax.setDate(dateMax.getDate()-(365*12));
        document.getElementById('dob').max = dateMax.toISOString().split("T")[0];
        dateMax.setDate(dateMax.getDate()-(365*90));
        document.getElementById('dob').min = dateMax.toISOString().split("T")[0];
    }, [])

    const placeholder = 'Where do you live?';

    return(
        <CreateProfileLayout
            error={error}
            setProfilePhoto={setProfilePhoto}
            setCoverPhoto={setCoverPhoto}
            coverPhoto={coverPhoto}
            profilePhoto={profilePhoto}
            updateProfile={updateProfile}
            isLoading={isLoading}
        >

            <FormControl style={{width: '100%'}}>
                <InputLabel id="gender_label">Select Gender</InputLabel>
                <Select
                    label={'Select Gender'}
                    labelId="gender_label"
                    value={input.gender}
                    name={'gender'}
                    onChange={e => setInput({...input, gender: e.target.value})}
                >
                    <MenuItem value={'male'}>Male</MenuItem>
                    <MenuItem value={'female'}>Female</MenuItem>
                    <MenuItem value={'other'}>Other</MenuItem>
                </Select>
            </FormControl>

            <GooglePlacesAutocomplete
                apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                onLoadFailed={() => {}}
                autocompletionRequest={{
                    componentRestrictions: {
                        country: ['pk'],
                    },
                    types: ['(cities)']
                }}
                selectProps={{
                    city,
                    onChange: setCity,
                    styles: {
                        container: (provided) => ({
                            ...provided,
                            height: '60px',
                            width: '100%',
                            position: 'relative',
                            borderRadius: '10px',
                            marginBottom: '5%'
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
                            height: '55px',
                            border: '1px solid rgba(0, 0, 0, 0.2)',
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

            <label htmlFor={'dob'} className={style.dateInputLabel}>Date of birth</label>
            <input
                id={'dob'}
                type={'date'}
                value={input.dob}
                onChange={e => setInput({...input, dob: e.target.value})}
                placeholder={'Date of birth'}
                className={style.dateInput}
            />

            <input
                type={'text'}
                value={input.phone}
                onChange={e => setInput({...input, phone: e.target.value})}
                placeholder={'Phone'}
                className={style.dateInput}
            />
        </CreateProfileLayout>
    );
}

export default TouristCreateProfile;
