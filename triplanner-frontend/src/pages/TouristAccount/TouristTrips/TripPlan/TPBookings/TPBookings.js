import {Fragment} from "react";
import TPCard from "../TPCard/TPCard";
import styles from "../TripPlan.module.css";

const TPBookings = ({trip}) => {

    return(
        <Fragment>
            {trip.selectedRooms.map((room, index) => (
                <TPCard className={styles.bookingContainer} key={index}>
                    <div className={styles.price}>
                        <p>PKR</p>
                        <p>{room.room.price}</p>
                    </div>

                    <div className={styles.bookingInfo}>
                        <h3>{room.hotel.name}</h3>
                        <p className={styles.roomDesc}><span style={{textTransform: 'capitalize'}}>{room.room.type}</span> Room - {room.hotel.city}</p>
                    </div>
                </TPCard>
            ))}
        </Fragment>
    );
}

export default TPBookings;
