import React, {useState} from "react";
import {Link} from 'react-router-dom';
import Account from "../Account";
import person_with_suitcase_icon from "../../../assets/person_with_suitcase_icon.png";
import {Button, TextField} from "@material-ui/core";
import styles from "../Account.module.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    return(
        <Account logoBoxIcon={person_with_suitcase_icon} title={'Find your account'}>
            <TextField
                label={'Email'}
                type={'email'}
                value={email}
                onChange={e => setEmail(e.target.value)}
                name={'email'}
            />

            <div className={styles.accountBox_button_options}>
                <Button color="secondary">Search</Button>
                <Link to={'/account/signin'}>Back</Link>
            </div>

        </Account>
    )
}

export default ForgotPassword;