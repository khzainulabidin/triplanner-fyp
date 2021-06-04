import React, {useState} from "react";
import PlanTripLayout from "../../../../components/PlanTripLayout/PlanTripLayout";
import CheckBox from "../../../../components/CheckBox/CheckBox";
import styles from '../../../../components/PlanTripLayout/PlanTripLayout.module.css';

const PTStaysGuests = ({progress, action, inputs, setInputs, clickBack}) => {
    const [error, setError] = useState('');

    const isChecked = id => {
        return inputs.placesToStay.some(place => place.id === id);
    }

    const changeFilter = place => {
        let updatedPlacesToStay;
        if (isChecked(place.id)){
            updatedPlacesToStay = inputs.placesToStay.filter(filter => filter.id !== place.id);
        }
        else {
            updatedPlacesToStay = [...inputs.placesToStay, place];
        }
        setInputs({...inputs, placesToStay: updatedPlacesToStay});
    }

    return(
        <PlanTripLayout
            title={<span>Where will you <b>stay</b></span>}
            error={error}
            setError={setError}
            progress={progress}
            action={action}
            actionText={'Next'}
            clickBack={clickBack}
            description={"Provide the number of people that will accompany you and select the places where you have plans to stay in the hotel"}
            skippable={true}
            skipAction={action}
            inputs={inputs}
            actionDisabled={inputs.numberOfGuests !== '' && (Number(inputs.numberOfGuests) < 0 || Number(inputs.numberOfGuests) > 10)}
        >

            <div className={'PTGridContainer'} style={{marginBottom: '3%'}}>
                <input
                    type={'text'}
                    className={'PTInput'}
                    placeholder={'Number of fellows accompanying'}
                    value={inputs.numberOfGuests}
                    onChange={e => setInputs({...inputs, numberOfGuests: e.target.value})}
                />
            </div>

            <div className={styles.staysCheckBox}>
                {inputs.destinations && inputs.destinations.map((destination, index) => (
                    <CheckBox
                        key={index}
                        name={destination.name}
                        onChange={() => changeFilter({id: destination.id, name: destination.name})}
                        checked={isChecked(destination.id)}
                    />
                ))}
            </div>
        </PlanTripLayout>
    );
}

export default PTStaysGuests;
