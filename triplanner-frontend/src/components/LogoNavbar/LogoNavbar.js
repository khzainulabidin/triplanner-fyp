import React from "react";
import styles from './LogoNavbar.module.css';
import logo from "../../assets/logo.png";
import {Link} from "react-router-dom";

const LogoNavbar = () => {
    return(
        <div className={styles.logoNavbar}>
            <Link to={'/'}><img src={logo} alt={'Logo'}/></Link>
        </div>
    );
}

export default LogoNavbar;