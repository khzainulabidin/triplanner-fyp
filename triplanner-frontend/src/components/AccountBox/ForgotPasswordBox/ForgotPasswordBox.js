import React from "react";
import {useSelector, useDispatch} from 'react-redux';

import {
    selectEmail,
    setEmail
} from "../../../redux/slices/account/forgotPassword";
import {toggleForgotMode} from '../../../redux/slices/account/signIn';

import AccountBox from "../AccountBox";
import person_with_suitcase_icon from "../../../assets/person_with_suitcase_icon.png";
import {Button, Link, TextField} from "@material-ui/core";
import styles from "../AccountBox.module.css";

const ForgotPasswordBox = () => {
    const dispatch = useDispatch();

    const email = useSelector(selectEmail);

    return(
        <AccountBox logoBoxIcon={person_with_suitcase_icon} title={'Find your account'}>
            <TextField
                label={'Email'}
                type={'email'}
                value={email}
                onChange={e => dispatch(setEmail(e.target.value))}
                name={'email'}
            />

            <div className={styles.accountBox_button_options}>
                <Button color="secondary">Search</Button>
                <Link onClick={() => dispatch(toggleForgotMode())}>Back</Link>
            </div>

        </AccountBox>
    )
}

export default ForgotPasswordBox;