import PlanTripLayout from "../../../../components/PlanTripLayout/PlanTripLayout";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import React, {useState, useEffect} from "react";
import DateTimePicker from 'react-datetime-picker';

const PTSourceDept = ({progress, action, inputs, setInputs, clickBack}) => {
    const [error, setError] = useState('');
    const [localSource, setLocalSource] = useState('');
    const [maxDeparture, setMaxDeparture] = useState(new Date());

    let placeholder = 'Choose your starting point';
    const {source: {label}, departureTime} = inputs;

    const setSource = place => {
        setInputs({...inputs, source: {name: place.label, id: place.value.place_id}});
        setLocalSource(place.label);
    }

    useEffect(() => {
        const departureTimeSuggested = new Date();
        departureTimeSuggested.setDate(departureTimeSuggested.getDate()+1);

        const departureTimeMax = new Date();
        departureTimeMax.setDate(departureTimeMax.getDate()+3);

        setInputs({...inputs, departureTime: departureTimeSuggested})
        setMaxDeparture(departureTimeMax);

        //eslint-disable-next-line
    }, []);

    const handleNext = () => {
        if (localSource === '' || departureTime === ''){
            return setError('In order to continue planning, you must have to provide both source and departure time');
        }

        action();
    }

    return(
        <PlanTripLayout
            title={<span>First things <b>first</b></span>}
            progress={progress}
            action={handleNext}
            actionText={'Next'}
            description={'Tell us from where you will start your journey and when will you depart'}
            clickBack={clickBack}
            actionDisabled={localSource === '' || departureTime === ''}
            error={error}
            setError={setError}
            inputs={inputs}
        >
            <div className={'PTGridContainer'} style={{gridTemplateColumns: '1.3fr 0.7fr'}}>
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
                        label,
                        onChange: place => setSource(place),
                        types: ['cities'],
                        styles: {
                            container: (provided) => ({
                                ...provided,
                                height: '45px',
                                width: '100%',
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
                                boxShadow: '0 0 30px rgba(0, 0, 0, 0.2)',
                                border: '0 none',
                                outline: '0 none',
                                borderRadius: '10px',
                                padding: '0 20px',
                                fontSize: '0.8rem',
                                cursor: 'text'
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

                <DateTimePicker
                    onChange={dateTime => setInputs({...inputs, departureTime: dateTime})}
                    value={departureTime}
                    className={'PTInput'}
                    disableClock={true}
                    minDate={new Date()}
                    maxDate={maxDeparture}
                />
            </div>
        </PlanTripLayout>
    );
}

export default PTSourceDept;
