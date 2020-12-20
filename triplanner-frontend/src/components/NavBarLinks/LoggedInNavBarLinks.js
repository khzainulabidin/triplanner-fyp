import React from "react";
import {Link} from "react-router-dom";
import styles from '../NavBar/NavBar.module.css';

const LoggedInNavBarLinks = ({avatar}) => (
    <div>
        <Link to={'/'}>Feed</Link>
        <Link to={'/'}>Explore</Link>
        <Link to={'/'}>Start Planning</Link>
        <img src={`${process.env.REACT_APP_API_UPLOADS_FOLDER}${avatar}`} className={styles.navBar_avatar} alt={'Person'}/>
    </div>
);

export default LoggedInNavBarLinks;