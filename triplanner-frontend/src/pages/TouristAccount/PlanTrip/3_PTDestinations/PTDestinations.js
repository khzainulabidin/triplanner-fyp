import PlanTripLayout from "../../../../components/PlanTripLayout/PlanTripLayout";
import React, {useState} from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import DestinationsTimeline from "../../../../components/DestinationsTimeline/DestinationsTimeline";

const PTDestinations = ({progress, action, inputs, setInputs, clickBack}) => {
    const [error, setError] = useState('');
    const [placeValue, setPlaceValue] = useState('');

    const {destinations} = inputs;
    let placeholder = destinations.length === 0 ? 'Select your destination' : 'Add stop';

    const handleAddDestination = place => {
        if (inputs.source.id !== place.value.place_id){
            setInputs({...inputs, destinations: [{name: place.label, id: place.value.place_id}, ...inputs.destinations]});
        }
        setPlaceValue('');
    }

    const handleDeleteDestination = id => {
        const updatedDestinations = destinations.filter(destination => destination.id !== id);
        setInputs({...inputs, destinations: updatedDestinations});
    }

    const handleNext = () => {
        if (!inputs.destinations || inputs.destinations.length === 0){
            return setError('You must select at least one destination');
        }

        action();
    }

    return(
        <PlanTripLayout
            title={destinations.length === 0 && <span>Select your <b>Destination(s)</b></span>}
            description={destinations.length === 0 && 'Select your destination, then add as many stops as you want, in between your source and your destination'}
            clickBack={clickBack}
            error={error}
            setError={setError}
            progress={progress}
            action={handleNext}
            actionText={'Next'}
            actionDisabled={destinations.length === 0}
            inputs={inputs}
        >
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
                    placeValue,
                    onChange: place => handleAddDestination(place),
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
                            boxShadow: window.innerWidth >= 768 ? '0 0 30px rgba(0, 0, 0, 0.2)' : '0 0 5px rgba(0, 0, 0, 0.2)',
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

            {destinations && destinations.length > 0 && <div>
                <DestinationsTimeline destinations={[inputs.source, ...destinations]} deleteDestination={handleDeleteDestination}/>
            </div>}
        </PlanTripLayout>
    );
}

export default PTDestinations;
