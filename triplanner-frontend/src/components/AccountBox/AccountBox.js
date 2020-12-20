import React from 'react';
import styles from './AccountBox.module.css';
import logo from "../../assets/logo.png";
import {Link} from "react-router-dom";
import Fade from "react-reveal/Fade";

const AccountBox = ({logoBoxIcon, title, children}) => (
    <div className={styles.accountBox}>
        <div className={styles.accountBox_box}>

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

export default AccountBox;