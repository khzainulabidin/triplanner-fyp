import React from "react";
import {useSelector, useDispatch} from 'react-redux';

import {
    selectPassword,
    setPassword,
    selectConfirmPassword,
    setConfirmPassword
} from "../../../redux/slices/account/forgotPassword";

import AccountBox from "../AccountBox";
import person_with_suitcase_icon from "../../../assets/person_with_suitcase_icon.png";
import {Button, TextField} from "@material-ui/core";

const ResetPasswordBox = () => {
    const dispatch = useDispatch();

    const password = useSelector(selectPassword);
    const confirmPassword = useSelector(selectConfirmPassword);

    return(
        <AccountBox logoBoxIcon={person_with_suitcase_icon} title={'Reset your password'}>

            <TextField
                label={'New Password'}
                type={'password'}
                value={password}
                onChange={e => dispatch(setPassword(e.target.value))}
                name={'resetPassword'}
            />

            <TextField
                label={'Confirm Password'}
                type={'password'}
                value={confirmPassword}
                onChange={e => dispatch(setConfirmPassword(e.target.value))}
                name={'resetConfirmPassword'}
            />

            <Button color="secondary">Reset</Button>

        </AccountBox>
    )
}

export default ResetPasswordBox;