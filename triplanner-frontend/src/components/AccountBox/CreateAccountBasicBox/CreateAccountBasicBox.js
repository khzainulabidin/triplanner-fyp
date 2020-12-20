import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {
    selectEmail,
    setEmail,
    selectPassword,
    setPassword,
    incrementSignUpProcess,
} from "../../../redux/slices/account/createAccount";
import {changeAccountMode} from '../../../redux/slices/account/signIn';

import AccountBox from "../AccountBox";
import {isValidEmail, isValidPassword} from "../../../utils/regex";
import destinations_icon from "../../../assets/destinations_icon.png";
import {Button, Link, TextField} from "@material-ui/core";
import styles from "../AccountBox.module.css";

const CreateAccountBasicBox = () => {
    const [error, setError] = useState('');

    const dispatch = useDispatch();

    const email = useSelector(selectEmail);
    const password = useSelector(selectPassword);

    const clickNext = () => {
        if (email !== '' && isValidEmail(email)){
            if (password !== '' && isValidPassword(password)){
                setError('');
                dispatch(incrementSignUpProcess());
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
        <AccountBox logoBoxIcon={destinations_icon} title={'Create an account'}>
            <p className={'accountBox_error'}>{error}</p>
            <div className={styles.accountBox_fieldsContainer}>
                <TextField
                    label={'Email'}
                    type={'email'}
                    value={email}
                    onChange={e => dispatch(setEmail(e.target.value.toLowerCase()))}
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

                <Button
                    color="secondary"
                    onClick={clickNext}
                >Next</Button>

                <p className={styles.accountBox_suggestion}>
                    Already have an account? <Link onClick={() => dispatch(changeAccountMode())}>Sign in here</Link>
                </p>
            </div>
        </AccountBox>
    )
}

export default CreateAccountBasicBox;