import styles from "./TripCard.module.css";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import {Link} from "react-router-dom";
import React from "react";
import {Zoom} from "react-reveal";

const TripCard = ({trip, username}) => {
    return(
        <Zoom>
            <div className={styles.tripCard}>
                <div className={styles.name}>
                    <span>{trip.source.name}</span> <FlightTakeoffIcon/>
                    <span>{trip.destinations[trip.destinations.length - 1].name}</span>
                </div>
                <div className={styles.actions}>
                    <Link to={`/profile/${username}`} className={styles.username}>@{username}</Link>
                    <Link to={`/tripPlan/${trip._id}`} className={styles.link}>View trip</Link>
                </div>
            </div>
        </Zoom>
    );
}

export default TripCard;
