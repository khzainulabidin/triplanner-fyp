import React from "react";
import {Link} from "react-router-dom";
import logo from "../../assets/logo.png";
import styles from "../NavBar/NavBar.module.css";

const Logo = ({linkDisabled}) => {
    return(
        linkDisabled ? <img src={logo} alt={'Logo'} className={styles.navBar_logo}/> : (
            <Link to={'/'}>
                <img src={logo} alt={'Logo'} className={styles.navBar_logo}/>
            </Link>
        )
    );
}

export default Logo;
