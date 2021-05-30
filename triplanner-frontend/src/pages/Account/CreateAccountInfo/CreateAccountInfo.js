import React, {useState, Fragment} from "react";
import Account from "../Account";
import snow_mountains_icon from "../../../assets/snow_mountains_icon.png";
import {Button, TextField, FormControl, InputLabel, Select, MenuItem} from "@material-ui/core";
import styles from "../Account.module.css";
import {isValidName} from "../../../utils/regex";
import axios from 'axios';
import {ACCOUNT_INFO_ROUTE} from "../../../utils/routes";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import {useHistory} from "react-router-dom";

const CreateAccountInfo = () => {
    const [error, setError] = useState('');
    const [inputs, setInputs] = useState({
        name: '',
        accountType: 'tourist',
    });
    const {name, accountType} = inputs;
    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory();

    const updateAccountInfo = () => {
        if (name === '' || !isValidName(name)){
            return setError('Invalid name');
        }
        if (accountType === ''){
            return setError('Invalid account type');
        }

        setIsLoading(true);
        axios.post(ACCOUNT_INFO_ROUTE, inputs, {headers: {
            'x-access-token': localStorage.getItem('token')
        }}).then(res => {
            setIsLoading(false);
            const data = res.data;
            if (!data.success){
                return setError(data.data);
            }
            setError('');

            if (accountType === 'tourist'){
                return history.push('/createProfile');
            }
            else if (accountType === 'business'){
                return history.push('/business/createProfile');
            }
        }).catch(() => {
            setIsLoading(false);
            setError('Unable to update account');
        });
    }

    return(
        <Fragment>
            <LoadingSpinner isLoading={isLoading}/>
            <Account logoBoxIcon={snow_mountains_icon} title={'Create an account'}>
                <p className={'accountBox_error'}>{error}</p>

                <TextField
                    label={'Name'}
                    type={'text'}
                    value={name}
                    onChange={e => setInputs({...inputs, name: e.target.value})}
                    name={'name'}
                    required
                />

                <FormControl>
                    <InputLabel id="account_type_label">Account Type</InputLabel>
                    <Select
                        label={'Account Type'}
                        labelId="account_type_label"
                        value={accountType}
                        onChange={e => setInputs({...inputs, accountType: e.target.value})}
                    >
                        <MenuItem value={'tourist'}>Tourist</MenuItem>
                        <MenuItem value={'business'}>Business</MenuItem>
                    </Select>
                </FormControl>

                <div className={styles.accountBox_button_options}>
                    <Button
                        color="secondary"
                        onClick={updateAccountInfo}
                    >Create account</Button>
                </div>
            </Account>
        </Fragment>
    )
}

export default CreateAccountInfo;