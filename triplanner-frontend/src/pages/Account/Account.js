import React, {useEffect} from 'react';
import styles from './Account.module.css';
import logo from "../../assets/logo.png";
import {Link, useHistory, useLocation} from "react-router-dom";
import Fade from "react-reveal/Fade";
import CloseIcon from "@material-ui/icons/Close";

const Account = ({logoBoxIcon, title, children}) => {
    const history = useHistory();
    const location = useLocation();
    const path = location.pathname;

    useEffect(() => {
        if (path !== '/account/createAccountInfo' && path !== '/account/interests' && localStorage.getItem('token')){
            history.push('/');
        }
        //eslint-disable-next-line
    }, []);

    return (
        <div className={styles.accountBox}>
            <div className={styles.accountBox_box}>
                <CloseIcon className={styles.closeIcon} onClick={() => history.push('/')}/>

                <div className={styles.accountBox_logoBox}>
                    <Fade>
                        <Link to={'/'}>
                            <img src={logo} alt={'logo'} className={styles.accountBox_logo}/>
                        </Link>
                        <img
                            src={logoBoxIcon}
                            alt={'logo_box_icon'}
                            className={styles.accountBox_icon}
                        />
                    </Fade>
                </div>

                <div className={styles.accountBox_contentBox}>
                    <Fade>
                        <h2 className={styles.accountBox_title}>{title}</h2>
                        <div className={styles.accountBox_form}>
                            <form noValidate autoComplete={'off'}>
                                {children}
                            </form>
                        </div>
                    </Fade>
                </div>

            </div>
        </div>
    );
}

export default Account;
