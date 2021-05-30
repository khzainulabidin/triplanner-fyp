import styles from "../TripPlan.module.css";
import {Fragment} from "react";

const TPCard = ({className, style, children}) => {
    return(
        <Fragment>
            <div className={[styles.container, className].join(' ')} style={style}>
                {children}
            </div>
        </Fragment>
    );
}

export default TPCard;
