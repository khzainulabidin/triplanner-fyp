import PlanTripLayout from "../../../../components/PlanTripLayout/PlanTripLayout";
import React, {useEffect, useState, Fragment} from "react";
import {getFriends} from "../../../../utils/auth";
import FindUsers from "../../../../components/FindUsers/FindUsers";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import {Chip} from "@material-ui/core";

const PTAddUsers = ({progress, action, inputs, setInputs, clickBack, skipAll}) => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [friends, setFriends] = useState([]);
    const [usersAccompanying, setUsersAccompanying] = useState([]);
    const [joinRequests, setJoinRequests] = useState([]);

    const handleNext = () => {
        setInputs({...inputs, usersAccompanying: joinRequests});
        action();
    }

    const removeUsersAccompanying = username => {
        const updatedUsers = usersAccompanying.filter(user => user !== username);
        const updatedRequests = joinRequests.filter(request => request.username !== username);
        setJoinRequests(updatedRequests);
        setUsersAccompanying(updatedUsers);
    }

    const addUsersAccompanying = username => {
        if (!usersAccompanying.includes(username)){
            const updatedUsers = [...usersAccompanying, username];
            const updatedRequests = [...joinRequests, {username, status: 'Pending'}];
            setUsersAccompanying(updatedUsers);
            setJoinRequests(updatedRequests);
        }
    }

    const fetchFriends = async () => {
        setIsLoading(true);
        const friendsRes = await getFriends();
        if (!friendsRes){
            setIsLoading(false);
            return setFriends([]);
        }

        setFriends(friendsRes);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchFriends().catch(() => setIsLoading(false))
    }, [])

    return(
        <Fragment>
            <LoadingSpinner isLoading={isLoading}/>
            <PlanTripLayout
                title={<span>Add your <b>fellows</b></span>}
                error={error}
                setError={setError}
                progress={progress}
                action={handleNext}
                actionText={'Next'}
                clickBack={clickBack}
                skippable={true}
                skipAction={action}
                skipAll={skipAll}
                inputs={inputs}
                description={"You can add your TriPlanner friends in your trip plan"}
            >
                {isLoading ? null : (
                    <Fragment>
                        <div className={'PTGridContainer'}>
                            <FindUsers array={friends} action={addUsersAccompanying}/>
                        </div>

                        <div style={{background: "white", padding: '3% 0', borderRadius: '10px', marginTop: '5%'}}>
                            {usersAccompanying.map((user, index) => (
                                <Chip
                                    key={index}
                                    label={user}
                                    onDelete={() => removeUsersAccompanying(user)}
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

export default PTAddUsers;
