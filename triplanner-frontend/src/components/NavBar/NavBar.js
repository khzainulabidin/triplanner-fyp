import React, {useState, useEffect} from "react";
import styles from './NavBar.module.css';
import Logo from "../Logo/Logo";
import NavBarLinks from "../NavBarLinks/NavBarLinks";
import LoggedInNavBarLinks from "../NavBarLinks/LoggedInNavBarLinks";
import CloseIcon from '@material-ui/icons/Close';
import {useDispatch, useSelector} from "react-redux";
import {selectIsLoggedIn, selectToken, selectUser} from "../../redux/slices/user/user";
import checkLoginStatus from "../../utils/checkLoginStatus";
//import NavBarSearch from "../NavBarSearch/NavBarSearch";

const NavBar = ({search}) => {
    const [displayNotice, setDisplayNotice] = useState(true);
    const user = useSelector(selectUser);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const token = useSelector(selectToken);

    const dispatch = useDispatch();

    useEffect(() => {
        checkLoginStatus(isLoggedIn, token, user, dispatch);
    }, []);

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