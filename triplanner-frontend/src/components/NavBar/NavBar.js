import React, {useEffect, useState, Fragment} from "react";
import styles from './NavBar.module.css';
import Logo from "../Logo/Logo";
import {Link} from "react-router-dom";
import placeholder from "../../assets/placeholder.png";
import {getMe} from "../../utils/auth";
import {Zoom} from "react-reveal";
import {useHistory} from "react-router-dom";

const NavBar = () => {
    const [user, setUser] = useState(null);
    const [avatar, setAvatar] = useState(placeholder);
    const [isLoading, setIsLoading] = useState(true);

    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem('token')){
            getMe().then(user => {
                setUser(user);
                setAvatar(`${process.env.REACT_APP_API_BASE_URL}/${user.avatar}`);
                setIsLoading(false);
            }).catch(() => {
                setUser(null);
                setIsLoading(false);
            });
        }
        else {
            setIsLoading(false);
        }
        //eslint-disable-next-line
    }, []);

    return(
        <Fragment>
            <div className={styles.navBar}>
                <Logo/>
                {isLoading ? null : user ?
                    <Zoom><img src={avatar} onClick={() => history.push('/dashboard')} className={styles.navBar_avatar} alt={'Person'}/></Zoom>
                    : <Zoom><Link to={'/account/signIn'}>Sign In</Link></Zoom>
                }
            </div>
        </Fragment>
    );
};

export default NavBar;
