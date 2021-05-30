import TPCard from "../TPCard/TPCard";
import styles from "../TripPlan.module.css";
import {formatDate} from "../../../../../utils/misc";
import React from "react";

const TPTimings = ({trip}) => {
    return(
        <TPCard className={styles.budgetContainer}>
            <div className={styles.budgetDetails}>
                <b>Trip created:</b>
                <p>{formatDate(new Date(trip.createdAt).getTime())}</p>
            </div>

            <div className={styles.budgetDetails}>
                <b>Last modified:</b>
                <p>{formatDate(new Date(trip.lastModified).getTime())}</p>
            </div>
        </TPCard>
    );
}

export default TPTimings;
