import React, {useState} from "react";
import styles from './NavBar.module.css';

import Logo from "../Logo/Logo";
//import NavBarSearch from "../NavBarSearch/NavBarSearch";
import NavBarLinks from "../NavBarLinks/NavBarLinks";
import LoggedInNavBarLinks from "../NavBarLinks/LoggedInNavBarLinks";
import CloseIcon from '@material-ui/icons/Close';

const NavBar = ({search, isLoggedIn, user}) => {
    const [displayNotice, setDisplayNotice] = useState(true);

    return(
        <React.Fragment>
            {isLoggedIn && !user.confirmed ? (
                <div className={styles.navBar_confirmationNotice} style={{display: displayNotice ? 'flex' : 'none'}}>
                    <p>Please check your mailbox to confirm your email</p>
                    <CloseIcon className={styles.navBar_closeIcon} onClick={() => setDisplayNotice(false)}/>
                </div>
            ) : null}
            <div className={styles.navBar}>
                <Logo/>
                {/*{search ? <NavBarSearch/> : null}*/}
                {isLoggedIn ? <LoggedInNavBarLinks avatar={user.avatar}/> : <NavBarLinks/>}
            </div>
        </React.Fragment>
    );
}

export default NavBar;