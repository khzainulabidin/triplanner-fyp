import React, {useState, Fragment} from "react";
import Account from "../Account";
import person_with_suitcase_icon from "../../../assets/person_with_suitcase_icon.png";
import {Button, TextField} from "@material-ui/core";
import {Link} from 'react-router-dom';
import styles from "../Account.module.css";
import {SIGNIN_ROUTE} from "../../../utils/routes";
import auth from "../../../utils/auth";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import {useHistory} from "react-router-dom";

const SignIn = () => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });
    const {email, password} = inputs;

    const history = useHistory();

    return(
        <Fragment>
            <LoadingSpinner isLoading={isLoading}/>
            <Account logoBoxIcon={person_with_suitcase_icon} title={'Sign in'}>
                <p className={'accountBox_error'}>{error}</p>
                <TextField
                    label={'Email'}
                    type={'email'}
                    value={email}
                    onChange={e => setInputs({...inputs, email: e.target.value.toLowerCase()})}
                    name={'email'}
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

                <div className={styles.accountBox_login_options}>
                    <Link to={'/account/forgotPassword'} className={styles.accountBox_link}>
                        Forgot password?
                    </Link>
                </div>

                <Button
                    color="secondary"
                    onClick={() => auth(email, password, setError, SIGNIN_ROUTE, inputs, history, setIsLoading)}
                >
                    Sign in
                </Button>

                <p className={styles.accountBox_suggestion}>
                    Don't have an account? <Link to={'/account/createAccountBasic'}> Create a new one</Link>
                </p>
            </Account>
        </Fragment>
    )
}

export default SignIn;