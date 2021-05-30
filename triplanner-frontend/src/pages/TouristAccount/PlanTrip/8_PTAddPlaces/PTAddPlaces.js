import PlanTripLayout from "../../../../components/PlanTripLayout/PlanTripLayout";
import React, {useState, Fragment, useEffect} from "react";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import axios from "axios";
import {SUGGEST_PLACES} from "../../../../utils/routes";
import Place from "../../../../components/Place/Place";
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import {v4 as uuid} from 'uuid';
import shuffle from "shuffle-array";

const PTAddPlaces = ({progress, action, inputs, setInputs, clickBack}) => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [places, setPlaces] = useState([]);
    const [textError, setTextError] = useState('');

    const fetchPlaces = async () => {
        if (inputs.destinationIds.length < 1){
            return setTextError('We do not have any places to suggest at this time');
        }

        setIsLoading(true);
        const res = await axios.post(SUGGEST_PLACES, {destinationIds: inputs.destinationIds, interests: inputs.interests});
        const data = res.data;
        if (!data.success){
            setIsLoading(false);
            return setTextError('Cannot connect to the server');
        }

        setPlaces(shuffle(data.data));
        setIsLoading(false);
    }

    const isPlaceSelected = id => {
        return inputs.suggestedPlacesToVisit.some(place => place.id === id);
    }

    const selectPlace = place => {
        let updatedPlaces;
        if (isPlaceSelected(place.id)){
            updatedPlaces = inputs.suggestedPlacesToVisit.filter(item => item.id !== place.id);
        }
        else {
            updatedPlaces = [...inputs.suggestedPlacesToVisit, place];
        }
        setInputs({...inputs, suggestedPlacesToVisit: updatedPlaces});
    }

    useEffect(() => {
        fetchPlaces().catch(() => setIsLoading(false));
        //eslint-disable-next-line
    }, []);

    return(
        <Fragment>
            <LoadingSpinner isLoading={isLoading}/>
            <PlanTripLayout
                title={<span>Let's add some places in your <b>bucket</b></span>}
                error={error}
                setError={setError}
                progress={progress}
                action={action}
                actionText={'Next'}
                clickBack={clickBack}
                skippable={true}
                inputs={inputs}
                skipAction={action}
                description={"These popular places will come in between your source and destination. You have an opportunity to visit them without making much extra effort"}
            >
                {isLoading ? null : places.length > 0 ?
                    <div className={'PTPlaceContainer'}>
                        {places.map(place => place.places.map(item => (
                            <Place
                                key={uuid()}
                                width={100}
                                place={item}
                                selectable={true}
                                onSelect={selectPlace}
                                selected={isPlaceSelected(item.place_id)}
                                parentId={place.id}
                            />
                        )))}
                    </div> :
                    <div className={'PTNoPlaces'}>
                        <SentimentVeryDissatisfiedIcon fontSize={'large'}/>
                        <p>{textError ? textError : <span>Unfortunately, right now, we do not have any places suggestions for your trip</span>}</p>
                    </div>
                }
            </PlanTripLayout>
        </Fragment>
    );
};

export default PTAddPlaces;
