import React from "react";
import styles from './LogoNavbar.module.css';
import logo from "../../assets/logo.png";
import {Link} from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';

const LogoNavbar = ({setOpenMenu}) => {
    return(
        <div className={styles.logoNavbar}>
            {setOpenMenu && <button onClick={() => setOpenMenu(true)}><MenuIcon/></button>}
            <Link to={'/'}><img src={logo} alt={'Logo'}/></Link>
        </div>
    );
}

export default LogoNavbar;
