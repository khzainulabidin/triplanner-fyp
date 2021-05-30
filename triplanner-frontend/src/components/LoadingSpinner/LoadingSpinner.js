import style from './LoadingSpinner.module.css';
import logo from '../../assets/logo.png';
import {Slide} from "react-reveal";

const LoadingSpinner = ({isLoading}) => {
    const content = isLoading ? (
        <Slide left>
            <div className={style.loadingSpinner}>
                <div className={style.ldsRipple}>
                    <div/>
                    <div/>
                </div>
                <img src={logo} alt={'Logo'}/>
            </div>
        </Slide>
    ) : null;

    return(
        content
    );
};

export default LoadingSpinner;