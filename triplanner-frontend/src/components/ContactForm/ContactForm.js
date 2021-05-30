import styles from './ContactForm.module.css';
import React, {useState, Fragment, useEffect} from "react";
import {isValidEmail, isValidName, isValidPhone, isValidString} from "../../utils/regex";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import {getMe, isAuthenticated} from "../../utils/auth";
import {Link} from "react-router-dom";
import {MESSAGES_ROUTE} from "../../utils/routes";

const ContactForm = ({hotelName, hotelId}) => {
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);

    const authenticate = async () => {
        try {
            setIsLoading(true);
            const res = await isAuthenticated('tourist');
            if (!res){
                return setAuthenticated(res);
            }

            const user = await getMe();
            setInputs({
                name: user.name,
                email: user.email,
                phone: user.phone,
                message: '',
            });

            setAuthenticated(res);
            setIsLoading(false);
        }
        catch (e){
            setIsLoading(false);
            setAuthenticated(false);
        }
    }

    useEffect(() => {
        authenticate().catch(() => {
            setIsLoading(false);
            setAuthenticated(false)
        });
    }, []);

    const sendMessage = async () => {
        try {
            const {name, email, phone, message} = inputs;

            if (name === '' || email === '' || phone === '' || message === ''){
                return setError('All fields are required');
            }
            if (!isValidName(name)){
                return setError('Enter a valid name');
            }
            if (!isValidEmail(email)){
                return setError('Enter a valid email');
            }
            if (!isValidPhone(phone)){
                return setError('Enter a valid phone');
            }
            if (!isValidString(message)){
                return setError('Enter a valid message');
            }

            setIsLoading(true);
            const res = await axios.post(MESSAGES_ROUTE,
                {message: {...inputs, hotelId, hotelName}},
                {headers: {'x-access-token': localStorage.getItem('token')}}
            );
            const data = res.data;
            setIsLoading(false);

            if (!data.success){
                return setError(data.data);
            }

            setError('');
            setSuccess(true);
        }
        catch (e){
            setError('Cannot connect to the server');
        }
    }

    return(
        <Fragment>
            <LoadingSpinner isLoading={isLoading}/>
            {!success ? <div className={styles.contact}>
                <p className={styles.title}>Contact {hotelName}</p>
                    {authenticated ? <Fragment>
                        <p className={styles.error}>{error}</p>
                        <div className={styles.contactContainer}>
                            <div>
                                <input type={'text'} placeholder={'Name'} required value={inputs.name}
                                       onChange={e => setInputs({...inputs, name: e.target.value})} disabled/>
                                <input type={'email'} placeholder={'Email'} required value={inputs.email}
                                       onChange={e => setInputs({...inputs, email: e.target.value})} disabled/>
                                <input type={'tel'} placeholder={'Phone'} required value={inputs.phone}
                                       onChange={e => setInputs({...inputs, phone: e.target.value})}/>
                                <input type={'submit'} value={'Send Message'} onClick={sendMessage}/>
                            </div>

                            <div>
                        <textarea rows={15} placeholder={'Message'} required value={inputs.message}
                                  onChange={e => setInputs({...inputs, message: e.target.value})}/>
                            </div>
                        </div>
                    </Fragment> : <p>Please <Link to={'/account/signIn'}>sign in</Link> to send a message</p>}
            </div> :
            <div className={styles.success}>
                <CheckCircleIcon style={{color: '#04B6A9', fontSize: '550%'}}/>
                <p className={styles.successTitle}>Message sent successfully!</p>
                <p className={styles.successDesc}>You message has been sent to {hotelName} and they will respond back shortly</p>
            </div>}
        </Fragment>
    );
};

export default ContactForm;
