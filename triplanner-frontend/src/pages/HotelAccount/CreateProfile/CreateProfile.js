import React, {useState} from "react";
import {TextField} from "@material-ui/core";
import {BUSINESS_PROFILE} from "../../../utils/routes";
import {isValidAddress, isValidPhone, isValidRating, isValidZipCode} from "../../../utils/regex";
import {useHistory} from "react-router-dom";
import CreateProfileLayout from "../../../components/CreateProfileLayout/CreateProfileLayout";
import {updateProfileOnServer} from "../../../utils/auth";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const CreateProfile = () => {
    const [error, setError] = useState('');
    const [coverPhoto, setCoverPhoto] = useState(null);
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [input, setInput] = useState({
        phone: '',
        starRating: '',
        address: '',
        zipCode: '',
    });
    const [city, setCity] = useState('');

    const history = useHistory();

    const updateProfile = async () => {
        const {phone, starRating, address, zipCode} = input;
        if (phone === '' || !isValidPhone(phone)){
            return setError('Invalid phone number');
        }
        if (starRating === '' || !isValidRating(starRating) || starRating < 1 || starRating > 10){
            return setError('Invalid rating');
        }
        if (address === '' || !isValidAddress(address)){
            return setError('Invalid address');
        }
        if (city === ''){
            return setError('Invalid city');
        }
        if (zipCode === '' || !isValidZipCode(zipCode)){
            return setError('Invalid zip code');
        }

        updateProfileOnServer(profilePhoto, coverPhoto, setError, setIsLoading, {...input, city: city.label}, history, BUSINESS_PROFILE, '/business/dashboard').catch(() => {
            setIsLoading(false)}
        );
    }

    const placeholder = 'City';

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
            <TextField
                label={'Phone'}
                type={'phone'}
                value={input.phone}
                onChange={e => setInput({...input, phone: e.target.value})}
                name={'phone'}
                required
                style={{width: '100%'}}
            />

            <TextField
                label={'Star Rating'}
                type={'number'}
                value={input.starRating}
                onChange={e => setInput({...input, starRating: e.target.value})}
                name={'starRating'}
                required
                style={{width: '100%'}}
            />

            <TextField
                label={'Street Address'}
                type={'text'}
                value={input.address}
                onChange={e => setInput({...input, address: e.target.value})}
                name={'address'}
                required
                style={{width: '100%'}}
            />

            <div style={{display: "flex", justifyContent: 'space-between'}}>
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

                <TextField
                    label={'Zip Code'}
                    type={'text'}
                    value={input.zipCode}
                    onChange={e => setInput({...input, zipCode: e.target.value})}
                    name={'zipCode'}
                    required
                    style={{width: '45%'}}
                />
            </div>
        </CreateProfileLayout>
    );
}

export default CreateProfile;
