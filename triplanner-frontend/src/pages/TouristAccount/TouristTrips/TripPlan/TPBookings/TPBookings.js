import {Fragment} from "react";
import TPCard from "../TPCard/TPCard";
import styles from "../TripPlan.module.css";

const TPBookings = ({user, trip, cancelBooking}) => {

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
                        <p className={styles.bookingStatus}>Status: Booking {trip.bookings[index].status}</p>
                    </div>

                    <div>
                        {user && trip && user.userId === trip.userId && trip.bookings[index].status === 'Confirmed' ?
                            <p className={styles.cancelBooking} onClick={() => cancelBooking(trip.bookings[index]._id, room.hotel.userId)}>
                                Cancel booking
                            </p> : null}
                    </div>
                </TPCard>
            ))}
        </Fragment>
    );
}

export default TPBookings;
