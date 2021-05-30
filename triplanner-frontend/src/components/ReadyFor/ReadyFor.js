import styles from './ReadyFor.module.css';
import MyCard from "../MyCard/MyCard";
import React from "react";
import {useHistory} from "react-router-dom";

const ReadyFor = ({title, actionText, onClick, route}) => {
    const history = useHistory();

    return(
        <MyCard>
            <div className={styles.readyForTrip}>
                <p>{title}</p>
                <button onClick={onClick ? onClick : () => history.push(route)}>{actionText}</button>
            </div>
        </MyCard>
    );
}

export default ReadyFor;
