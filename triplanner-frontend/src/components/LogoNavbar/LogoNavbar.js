import React from "react";
import styles from './LogoNavbar.module.css';
import logo from "../../assets/logo.png";

const LogoNavbar = () => {
    return(
        <div className={styles.logoNavbar}>
            <img src={logo} alt={'Logo'}/> | Business
        </div>
    );
}

export default LogoNavbar;