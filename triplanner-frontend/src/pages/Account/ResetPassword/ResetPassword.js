import React, {useState} from "react";
import Account from "../Account";
import person_with_suitcase_icon from "../../../assets/person_with_suitcase_icon.png";
import {Button, TextField} from "@material-ui/core";

const ResetPassword = () => {
    const [inputs, setInputs] = useState({
        password: '',
        confirmPassword: '',
    });
    const {password, confirmPassword} = inputs;

    return(
        <Account logoBoxIcon={person_with_suitcase_icon} title={'Reset your password'}>

            <TextField
                label={'New Password'}
                type={'password'}
                value={password}
                onChange={e => setInputs({...inputs, password: e.target.value})}
                name={'resetPassword'}
            />

            <TextField
                label={'Confirm Password'}
                type={'password'}
                value={confirmPassword}
                onChange={e => setInputs({...inputs, confirmPassword: e.target.value})}
                name={'resetConfirmPassword'}
            />

            <Button color="secondary">Reset</Button>

        </Account>
    )
}

export default ResetPassword;