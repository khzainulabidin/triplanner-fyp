import React, {Fragment, useEffect, useState} from "react";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import PlanTripLayout from "../../../../components/PlanTripLayout/PlanTripLayout";
import {getMe} from "../../../../utils/auth";
import {addInterest, removeInterest} from "../../../../utils/misc";
import {Chip} from "@material-ui/core";
import axios from "axios";
import {TOURIST_INTERESTS} from "../../../../utils/routes";

const PTAddHobbies = ({progress, action, inputs, setInputs, clickBack}) => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [interest, setInterest] = useState('');
    const [interests, setInterests] = useState([]);

    const handleNext = async () => {
        try {
            setIsLoading(true);
            setInputs({...inputs, interests});
            const res = await axios.put(TOURIST_INTERESTS, {interests}, {headers: {'x-access-token': localStorage.getItem('token')}});
            setIsLoading(false);
            const data = res.data;
            if (!data.success){
                return setError('Unable to update hobbies at this time');
            }

            action();
        }
        catch (e){
            setIsLoading(false);
            setError('Cannot connect to the sever');
        }
    }

    const fetchHobbies = async () => {
        setIsLoading(true);
        const user = await getMe();
        setInterests(user.interests);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchHobbies().catch(() => setIsLoading(false));
    }, []);

    return(
        <Fragment>
            <LoadingSpinner isLoading={isLoading}/>
            <PlanTripLayout
                title={<span>Wanna update your <b>hobbies?</b></span>}
                error={error}
                setError={setError}
                progress={progress}
                action={handleNext}
                actionText={'Next'}
                clickBack={clickBack}
                skippable={true}
                inputs={inputs}
                skipAction={action}
                description={"We'll suggest you places based on your hobbies. If you skip it, we'll still suggest you the popular places along your route"}
            >
                {isLoading ? null : (
                    <Fragment>
                        <div className={'PTGridContainer'}>
                            <input
                                className={'PTInput'}
                                type={'text'}
                                value={interest}
                                onChange={e => setInterest(e.target.value.toLowerCase())}
                                name={'interest'}
                                onKeyPress={e => addInterest(e, setError, interest, setInterest, interests, setInterests)}
                                placeholder={'Add hobby'}
                                disabled={interests.length >= 5}
                            />
                        </div>

                        <div style={{background: 'white', borderRadius: '10px', padding: '2% 0', margin: '2% 0'}}>
                            <p style={{fontSize: '0.8rem', color: 'rgba(0, 0, 0, 0.5)', margin: '1% 0'}}>You can add up to 5 hobbies</p>
                            {interests && interests.map((interest, index) => (
                                <Chip
                                    key={index}
                                    label={interest.substr(0, 1).toUpperCase() + interest.substr(1).toLowerCase()}
                                    onDelete={() => removeInterest(interest, interests, setInterests)}
                                    variant="outlined"
                                />
                            ))}
                        </div>
                    </Fragment>
                )}
            </PlanTripLayout>
        </Fragment>
    )
}

export default PTAddHobbies;
