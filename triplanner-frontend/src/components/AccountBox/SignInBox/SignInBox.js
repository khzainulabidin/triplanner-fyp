import React, {useState} from "react";
import {useSelector, useDispatch} from 'react-redux';

import {
    selectEmail,
    setEmail,
    selectPassword,
    setPassword,
    changeAccountMode,
    toggleForgotMode,
} from "../../../redux/slices/account/signIn";
import {setToken} from "../../../redux/slices/user/user";

import AccountBox from "../AccountBox";
import person_with_suitcase_icon from "../../../assets/person_with_suitcase_icon.png";
import {Button, Link, TextField} from "@material-ui/core";
import styles from "../AccountBox.module.css";
import {isValidEmail, isValidPassword} from "../../../utils/regex";
import axios from "axios";
import {useHistory} from "react-router-dom";

const SignInBox = () => {
    const [error, setError] = useState('');
    let history = useHistory();

    const dispatch = useDispatch();

    const email = useSelector(selectEmail);
    const password = useSelector(selectPassword);

    const api = axios.create({
        baseURL: `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_API_AUTH_ROUTE}/login`,
    });

    const handleSignIn = () => {
        if (email !== '' && isValidEmail(email)){
            if (password !== '' && isValidPassword(password)){
                setError('');
                const user = {
                    email,
                    password
                };

                api.post('/', user).then(res => {
                    if (res.data.success){
                        dispatch(setToken(res.data.token));
                        history.push('/');
                    }
                    else {
                        setError(res.data.error);
                    }
                }).catch(err => console.log(err.message));
            }
            else {
                setError('Please enter a valid password');
            }
        }
        else {
            setError('Please enter a valid email');
        }
    }

    return(
        <AccountBox logoBoxIcon={person_with_suitcase_icon} title={'Sign in'}>
            <p className={'accountBox_error'}>{error}</p>
            <TextField
                label={'Email'}
                type={'email'}
                value={email}
                onChange={e => dispatch(setEmail(e.target.value))}
                name={'email'}
                required
            />

            <TextField
                label={'Password'}
                type={'password'}
                value={password}
                onChange={e => dispatch(setPassword(e.target.value))}
                name={'password'}
                required
            />

            <div className={styles.accountBox_login_options}>
                <Link
                    onClick={() => dispatch(toggleForgotMode())}
                    className={styles.accountBox_link}
                >
                    Forgot password?
                </Link>
            </div>

            <Button color="secondary" onClick={handleSignIn}>Sign in</Button>

            <p className={styles.accountBox_suggestion}>
                Don't have an account? <Link onClick={() => dispatch(changeAccountMode())}> Create a new one</Link>
            </p>
        </AccountBox>
    )
}

export default SignInBox;