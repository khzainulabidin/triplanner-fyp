import PlanTripLayout from "../../../../components/PlanTripLayout/PlanTripLayout";
import React, {useState, Fragment, useEffect} from "react";
import CheckBox from "../../../../components/CheckBox/CheckBox";
import {isValidNumber} from "../../../../utils/regex";
import axios from "axios";
import {GET_AVERAGE_BUDGET, TIME_DISTANCE} from "../../../../utils/routes";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';

const PTBudget = ({progress, action, inputs, setInputs, clickBack}) => {
    const PETROL_PRICE_PER_LITRE = 108;
    const DIESEL_PRICE_PER_LITRE = 110;
    const CNG_PRICE_PER_LITRE = 81;

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [averageBudget, setAverageBudget] = useState('');
    const {totalBudget, usingOwnCar, fuelAverage} = inputs;

    const fetchAverageBudget = async () => {
        setIsLoading(true);
        const res = await axios.get(
            `${GET_AVERAGE_BUDGET}/${inputs.source.name}/${inputs.destinations[inputs.destinations.length - 1].name}`,
            {headers: {'x-access-token': localStorage.getItem('token')}}
        );
        const data = res.data;
        if (!data.success){
            setIsLoading(false);
            return;
        }

        setAverageBudget(data.data);
        setIsLoading(false);
    }

    const handleNext = async () => {
        if (!totalBudget || (usingOwnCar && !fuelAverage)){
            return setError(`Please provide your total budget and your car fuel average in kilometers per ${inputs.fuelType === 'cng' ? 'kilogram' : 'litre'}, in case you will be using your own car`);
        }
        if (!isValidNumber(totalBudget) || Number(totalBudget) < 1 || (usingOwnCar && (!isValidNumber(fuelAverage) || Number(fuelAverage) < 1))){
            return setError('Please provide valid input and try again');
        }

        setIsLoading(true);
        const destinationIds = [];
        for (let i=0; i<inputs.destinations.length; i++){
            destinationIds.push(inputs.destinations[i].id);
        }

        const res = await axios.post(TIME_DISTANCE, {source: inputs.source.id, destinations: destinationIds, departureTime: new Date(inputs.departureTime).getTime()});
        const data = res.data;
        if (!data.success){
            setIsLoading(false);
            return setError('We are unable to connect to the server at this time');
        }

        const requiredRes = data.data.rows[0].elements;
        const timeDistances = [];
        for (let i=0; i<requiredRes.length; i++){
            timeDistances.push({distance: requiredRes[i].distance, time: requiredRes[i].duration});
        }

        const sortedDestinations = inputs.destinations;
        for (let i=0; i<timeDistances.length; i++){
            for (let j=0; j<timeDistances.length-i-1; j++){
                if (timeDistances[j].distance.value > timeDistances[j+1].distance.value){
                    let tempDistance = timeDistances[j];
                    timeDistances[j] = timeDistances[j+1];
                    timeDistances[j+1] = tempDistance;

                    let tempDestination = sortedDestinations[j];
                    sortedDestinations[j] = sortedDestinations[j+1];
                    sortedDestinations[j+1] = tempDestination;
                }
            }
        }

        let updatedBudget = Number(inputs.availableBudget), fuelCost = 0;
        if (usingOwnCar){
            let fuelPrice = 1;
            const localFuelType = inputs.fuelType;
            if (localFuelType === 'petrol'){
                fuelPrice = PETROL_PRICE_PER_LITRE;
            }
            else if (localFuelType === 'diesel'){
                fuelPrice = DIESEL_PRICE_PER_LITRE;
            }
            else if (localFuelType === 'cng'){
                fuelPrice = CNG_PRICE_PER_LITRE;
            }

            fuelCost = ((((timeDistances[timeDistances.length-1].distance.value/1000)/Number(fuelAverage))*fuelPrice)*2).toFixed(1);
            updatedBudget = (updatedBudget - fuelCost).toFixed(1);

            if (updatedBudget < 1){
                setIsLoading(false);
                return setError(`You have already ran out of budget. Based on your budget of PKR ${totalBudget} and car fuel average of ${fuelAverage} KM per ${inputs.fuelType === 'cng' ? 'kilogram' : 'litre'}, your fuel cost is PKR ${fuelCost} and your available budget after fuel cost is PKR ${updatedBudget}`)
            }
        }

        setInputs({...inputs, destinations: sortedDestinations, timeDistances, destinationIds, availableBudget: updatedBudget, fuelCost});
        setIsLoading(false);

        action();
    }

    useEffect(() => {
        fetchAverageBudget().catch(() => setIsLoading(false));
        //eslint-disable-next-line
    }, []);

    return(
        <Fragment>
            <LoadingSpinner isLoading={isLoading}/>
            <PlanTripLayout
                title={<span>What's your <b>budget</b></span>}
                error={error}
                setError={setError}
                progress={progress}
                action={handleNext}
                actionText={'Next'}
                clickBack={clickBack}
                description={`Provide your total budget and your car fuel average in kilometers per ${inputs.fuelType === 'cng' ? 'kilogram' : 'litre'}, in case you will be using your own car. We'll calculate the approx. fuel cost for you`}
                actionDisabled={!totalBudget || (usingOwnCar && !fuelAverage)}
                inputs={inputs}
            >
                {averageBudget && inputs.source && inputs.destinations && <p style={{
                    background: '#04B6A9',
                    marginBottom: '3%',
                    padding: '1% 3%',
                    color: 'white',
                    width: 'fit-content',
                    borderRadius: '10px',
                    display: "flex",
                    alignItems: "center"
                }}>
                    <WbIncandescentIcon style={{paddingRight: '2%'}}/> People who travel from {inputs.source.name.split(',')[0]} to {inputs.destinations[inputs.destinations.length - 1].name.split(',')[0]} usually spend PKR {averageBudget}
                </p>}

                <div className={'PTGridContainer'} style={{marginBottom: '3%', gridTemplateColumns: '0.5fr 1.5fr'}}>
                    <input
                        type={'text'}
                        className={'PTInput'}
                        placeholder={'Total budget'}
                        value={totalBudget}
                        onChange={e => setInputs({...inputs, totalBudget: e.target.value, availableBudget: e.target.value})}
                    />

                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <input
                            style={{width: '56%'}}
                            type={'text'}
                            className={'PTInput'}
                            placeholder={'Car fuel average in kilometers per litre'}
                            value={fuelAverage}
                            onChange={e => setInputs({...inputs, fuelAverage: e.target.value})}
                            disabled={!usingOwnCar}
                        />

                        <select
                            className={'PTInput'} style={{width: '40%'}}
                            value={inputs.fuelType}
                            onChange={e => setInputs({...inputs, fuelType: e.target.value})}
                            disabled={!usingOwnCar}
                        >
                            <option value={'petrol'}>Petrol</option>
                            <option value={'diesel'}>Diesel</option>
                            <option value={'cng'}>CNG</option>
                        </select>
                    </div>
                </div>

                <div style={{background: 'white', padding: '2% 0'}}>
                    <CheckBox
                        name={"I will be using my own car and I know the fuel average"}
                        onChange={() => setInputs({...inputs, usingOwnCar: !usingOwnCar})}
                        checked={usingOwnCar}
                    />
                </div>
            </PlanTripLayout>
        </Fragment>
    );
}

export default PTBudget;
