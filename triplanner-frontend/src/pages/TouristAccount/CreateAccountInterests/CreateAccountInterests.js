import React, {useState, Fragment, useEffect} from "react";
import Account from "../../Account/Account";
import barbecue_icon from "../../../assets/barbecue_icon.png";
import {Button, TextField, Chip} from "@material-ui/core";
import styles from "../../Account/Account.module.css";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import {addInterest, removeInterest} from "../../../utils/misc";
import axios from "axios";
import {TOURIST_INTERESTS} from "../../../utils/routes";
import {useHistory} from "react-router-dom";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import {getMe} from "../../../utils/auth";

const CreateAccountInterests = () => {
    const [interest, setInterest] = useState('');
    const [interests, setInterests] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory();

    const updateInterestsOnServer = () => {
        setIsLoading(true);
        axios.put(TOURIST_INTERESTS, {interests}, {headers: {
            'x-access-token': localStorage.getItem('token')
        }}).then(res => {
            setIsLoading(false);
            const data = res.data;
            if (!data.success){
                return setError(data.data);
            }

            history.push('/');
        }).catch(() => {
            setError('Unable to update interest');
        })
    }

    useEffect(() => {
        setIsLoading(true);
        getMe().then(user => {
            setIsLoading(false);
            setInterests(user.interests);
        }).catch(() => {
            setIsLoading(false);
            setInterests([]);
        });
    }, [])

    return(
        <Fragment>
            <LoadingSpinner isLoading={isLoading}/>
            <Account logoBoxIcon={barbecue_icon} title={'Tell us about yourself'}>
                <p className={'accountBox_error'}>{error}</p>
                <TextField
                    label={'Interests'}
                    type={'text'}
                    value={interest}
                    onChange={e => setInterest(e.target.value.toLowerCase())}
                    name={'interest'}
                    onKeyPress={e => addInterest(e, setError, interest, setInterest, interests, setInterests)}
                    disabled={interests.length >= 5}
                />

                <div className={styles.accountBox_chips}>
                    {interests.map((interest, index) => (
                        <Chip
                            key={index}
                            label={interest.substr(0, 1).toUpperCase() + interest.substr(1).toLowerCase()}
                            onDelete={() => removeInterest(interest, interests, setInterests)}
                            variant="outlined"
                        />
                    ))}
                </div>

                <div className={styles.accountBox_button_options}>
                    <Button color="secondary" onClick={updateInterestsOnServer}>Finish</Button>
                </div>

                <p className={styles.accountBox_suggestion}>
                    <InfoOutlinedIcon className={styles.accountBox_info_icon}/> Press Enter to insert values. You can add up to 5 interests
                </p>
            </Account>
        </Fragment>
    );
}

export default CreateAccountInterests;
