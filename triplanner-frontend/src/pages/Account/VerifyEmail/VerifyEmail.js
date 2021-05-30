import {useParams} from "react-router";
import axios from "axios";
import {VERIFY_EMAIL_ROUTE} from "../../../utils/routes";
import {useEffect, useState, Fragment} from "react";
import LogoNavbar from "../../../components/LogoNavbar/LogoNavbar";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import style from './VerifyEmail.module.css';
import {Link} from "react-router-dom";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const VerifyEmail = () => {
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const {iv, content, token} = useParams();

    const verify = () => {
        setIsLoading(true);
        axios.post(`${VERIFY_EMAIL_ROUTE}/${iv}/${content}/${token}`).then(res => {
            setIsLoading(false);
            const data = res.data;
            setSuccess(data.success);
            setMessage(data.data);
        }).catch(() => {
            setIsLoading(false);
            setMessage('Something went wrong')
        })
    }

    useEffect(() => {
        verify();
        //eslint-disable-next-line
    }, []);

    return(
        <Fragment>
            <LoadingSpinner isLoading={isLoading}/>
            <LogoNavbar/>
            <div className={style.verifyEmail}>
                {isLoading ? null : (
                    <div>
                        {success
                            ? <CheckCircleIcon style={{color: '#04B6A9', fontSize: '550%'}}/>
                            : <ErrorOutlineIcon style={{color: '#DD5145', fontSize: '550%'}}/>
                        }
                        <p>{message}</p>
                        {success ? <Link to={'/account/signin'}>Continue</Link> : null}
                    </div>
                )}
            </div>
        </Fragment>
    );
}

export default VerifyEmail;
