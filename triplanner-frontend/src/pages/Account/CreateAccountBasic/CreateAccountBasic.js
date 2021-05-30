import React, {useState, Fragment} from "react";
import Account from "../Account";
import destinations_icon from "../../../assets/destinations_icon.png";
import {Button, TextField} from "@material-ui/core";
import styles from "../Account.module.css";
import {Link, useHistory} from 'react-router-dom';
import {REGISTER_ROUTE} from "../../../utils/routes";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import auth from "../../../utils/auth";

const CreateAccountBasic = () => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [inputs, setInputs] = useState({
        email: '',
        username: '',
        password: '',
    });
    const {email, username, password} = inputs;

    const history = useHistory();

    return(
        <Fragment>
            <LoadingSpinner isLoading={isLoading}/>
            <Account logoBoxIcon={destinations_icon} title={'Create an account'}>
                <p className={'accountBox_error'}>{error}</p>
                <div className={styles.accountBox_fieldsContainer}>
                    <TextField
                        label={'Email'}
                        type={'email'}
                        value={email}
                        onChange={e => setInputs({...inputs, email: e.target.value.toLowerCase()})}
                        name={'email'}
                        required
                    />

                    <TextField
                        label={'Username'}
                        type={'text'}
                        value={username}
                        onChange={e => setInputs({...inputs, username: e.target.value.toLowerCase()})}
                        name={'username'}
                        required
                    />

                    <TextField
                        label={'Password'}
                        type={'password'}
                        value={password}
                        onChange={e => setInputs({...inputs, password: e.target.value})}
                        name={'password'}
                        required
                    />

                    <Button
                        color="secondary"
                        onClick={() => auth(email, password, setError, REGISTER_ROUTE, inputs, history, setIsLoading, username)}
                    >Next</Button>

                    <p className={styles.accountBox_suggestion}>
                        Already have an account? <Link to={'/account/signIn'}>Sign in here</Link>
                    </p>
                </div>
            </Account>
        </Fragment>
    )
}

export default CreateAccountBasic;