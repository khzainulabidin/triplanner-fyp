import style from './ErrorPageLayout.module.css';
import {Fragment} from "react";
import LogoNavbar from "../LogoNavbar/LogoNavbar";
import error_icon from '../../assets/error_icon.svg';

const ErrorPageLayout = ({icon, text}) => {
    return(
        <Fragment>
            <LogoNavbar/>
            <div className={style.container}>
                <img src={icon ? icon : error_icon} alt={'Error'}/>
                <p>{text}</p>
            </div>
        </Fragment>
    );
}

export default ErrorPageLayout;
