import style from './MyLayout.module.css';
import {Fragment, useEffect, useState} from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import logo from "../../assets/logo.png";
import {Link, useHistory} from "react-router-dom";
import {getMe, logout} from "../../utils/auth";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import email_not_verified from '../../assets/email_not_verified.svg';
import ErrorPageLayout from "../ErrorPageLayout/ErrorPageLayout";
import {Fade} from "react-reveal";

const MyLayout = ({isLoading, menu, logoTag, homeUrl, children}) => {
    const history = useHistory();
    const [isEmailVerified, setIsEmailVerified] = useState(true);
    const [isBanned, setIsBanned] = useState(false);

    useEffect(() => {
        setIsBanned(sessionStorage.getItem('isBanned') === 'true');
        getMe().then(user => {
            setIsEmailVerified(user.confirmed);
        });
    }, [])

    return(
        isEmailVerified ? !isBanned ? <Fade><Fragment>
            <LoadingSpinner isLoading={isLoading}/>
            <div className={style.dashboard}>
                <div className={style.menu}>
                    <Link to={homeUrl} className={style.logo}><img src={logo} alt={'Logo'}/>{logoTag}</Link>
                    <div className={style.menuItems}>
                        {menu}
                        <Link to={''} onClick={() => logout(history)}><ExitToAppIcon className={'menuIcon'}/> Logout</Link>
                    </div>
                </div>

                <Fade>
                    <div className={style.content}>
                        {children}
                    </div>
                </Fade>
            </div>
        </Fragment></Fade> :
            <Fade><ErrorPageLayout text={'You have been banned from using TriPlanner'}/></Fade> :
            <Fade><ErrorPageLayout icon={email_not_verified} text={'Please verify your email address to continue using TriPlanner'}/></Fade>
    );
}

export default MyLayout;
