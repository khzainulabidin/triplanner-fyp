import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";

import {
    selectInterests,
    addInterest,
    removeInterest
} from "../../../redux/slices/account/createAccount";

import AccountBox from "../AccountBox";
import barbecue_icon from "../../../assets/barbecue_icon.png";

import {
    Button,
    TextField,
    Chip
} from "@material-ui/core";

import styles from "../AccountBox.module.css";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import {isValidInterest} from "../../../utils/regex";
import axios from "axios";
import {Link, useHistory} from "react-router-dom";
import {setUser, selectToken} from "../../../redux/slices/user/user";

const CreateAccountInterestsBox = () => {
    const [interest, setInterest] = useState('');
    const [error, setError] = useState('');
    let history = useHistory();

    const dispatch = useDispatch();
    const interests = useSelector(selectInterests);
    const token = useSelector(selectToken);

    const api = axios.create({
        baseURL: `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_API_AUTH_ROUTE}/updateDetails`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const addInterestHandler = (e) => {
        if (e.key === 'Enter'){
            e.preventDefault();
            if (interest !== '' && isValidInterest(interest)){
                setError('');
                dispatch(addInterest(interest));
            }
            else {
                setError('Please enter a valid interest');
            }
            setInterest('');
        }
    }

    const handleFinish = () => {
        api.put('/', {interests}).then(res => {
            if (res.data.success){
                setError('');
                dispatch(setUser(res.data.data));
                history.push('/');
            }
            else {
                setError(res.data.error);
            }
        }).catch(err => console.log(err.message));
    }

    return(
        <AccountBox logoBoxIcon={barbecue_icon} title={'Tell us about yourself'}>
            <p className={'accountBox_error'}>{error}</p>
            <TextField
                label={'Interests'}
                type={'text'}
                value={interest}
                onChange={e => setInterest(e.target.value.toLowerCase())}
                name={'interest'}
                onKeyPress={e => addInterestHandler(e)}
                disabled={interests.length >= 5}
            />

            <div className={styles.accountBox_chips}>
                {interests.map((interest, index) => (
                    <Chip
                        key={index}
                        label={interest.substr(0, 1).toUpperCase() + interest.substr(1).toLowerCase()}
                        onDelete={() => dispatch(removeInterest(interest))}
                        variant="outlined"
                    />
                ))}
            </div>

            <div className={styles.accountBox_button_options}>
                <Button color="secondary" onClick={handleFinish}>Finish</Button>
                <Link to={'/'}>Skip for now</Link>
            </div>

            <p className={styles.accountBox_suggestion}>
                <InfoOutlinedIcon className={styles.accountBox_info_icon}/> Press Enter to insert values. You can add up to 5 interests
            </p>
        </AccountBox>
    );
}

export default CreateAccountInterestsBox;