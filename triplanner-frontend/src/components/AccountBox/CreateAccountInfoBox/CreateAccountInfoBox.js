import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {
    selectUsername,
    setUsername,
    selectName,
    setName,
    selectAccType,
    setAccType,
    incrementSignUpProcess,
    decrementSignUpProcess,
    selectEmail,
    selectPassword,
} from "../../../redux/slices/account/createAccount";
import {changeAccountMode} from '../../../redux/slices/account/signIn';
import {setToken} from "../../../redux/slices/user/user";

import AccountBox from "../AccountBox";
import snow_mountains_icon from "../../../assets/snow_mountains_icon.png";
import {
    Button,
    Link,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@material-ui/core";
import styles from "../AccountBox.module.css";
import {isValidName, isValidUsername} from "../../../utils/regex";
import axios from 'axios';
import {useHistory} from "react-router";

const CreateAccountInfoBox = () => {
    const [error, setError] = useState('');

    const dispatch = useDispatch();

    const history = useHistory();

    const username = useSelector(selectUsername);
    const name = useSelector(selectName);
    const accountType = useSelector(selectAccType);
    const email = useSelector(selectEmail);
    const password = useSelector(selectPassword);

    const api = axios.create({
        baseURL: `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_API_AUTH_ROUTE}/register`,
    });

    const handleCreateAccount = () => {
        if (username !== '' && isValidUsername(username)){
            if (name !== '' && isValidName(name)){
                setError('');
                const user = {
                    email,
                    password,
                    username,
                    name,
                    accountType
                };

                api.post('/', user).then(res => {
                    if (res.data.success){
                        dispatch(setToken(res.data.token));
                        if (user.accountType === 'business'){
                            return history.push('/hotelInfo');
                        }
                        dispatch(incrementSignUpProcess());
                    }
                    else {
                        setError(res.data.error);
                    }
                }).catch(err => console.log(err.message));
            }
            else {
                setError('Please enter a valid name');
            }
        }
        else {
            setError('Please enter a valid username');
        }
    }

    return(
        <AccountBox logoBoxIcon={snow_mountains_icon} title={'Create an account'}>
            <p className={'accountBox_error'}>{error}</p>
            <TextField
                label={'Username'}
                type={'text'}
                value={username}
                onChange={e => dispatch(setUsername(e.target.value.toLowerCase()))}
                name={'username'}
                required
            />

            <TextField
                label={'Name'}
                type={'text'}
                value={name}
                onChange={e => dispatch(setName(e.target.value))}
                name={'name'}
                required
            />

            <FormControl>
                <InputLabel id="account_type_label">Account Type</InputLabel>
                <Select
                    label={'Account Type'}
                    labelId="account_type_label"
                    value={accountType}
                    onChange={e => dispatch(setAccType(e.target.value))}
                >
                    <MenuItem value={'tourist'}>Tourist</MenuItem>
                    <MenuItem value={'business'}>Business</MenuItem>
                </Select>
            </FormControl>

            <div className={styles.accountBox_button_options}>
                <Button
                    color="secondary"
                    onClick={handleCreateAccount}
                >Create account</Button>
                <Link onClick={() => dispatch(decrementSignUpProcess())}>Back</Link>
            </div>

            <p className={styles.accountBox_suggestion}>
                Already have an account? <Link onClick={() => dispatch(changeAccountMode())}>Sign in here</Link>
            </p>
        </AccountBox>
    )
}

export default CreateAccountInfoBox;