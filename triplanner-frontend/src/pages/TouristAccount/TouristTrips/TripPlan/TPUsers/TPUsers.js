import {Fragment} from "react";
import TPCard from "../TPCard/TPCard";
import styles from "../TripPlan.module.css";

const TPUsers = ({trip, user, cancelRequest}) => {
    return(
        <Fragment>
            {trip.usersAccompanying.map((request, index) => (
                <TPCard className={styles.bookingContainer} key={index}>
                    <div className={styles.price}>
                        <p>{request.status}</p>
                    </div>

                    <div className={styles.bookingInfo}>
                        <p>@ {request.username}</p>
                    </div>

                    <div>
                        {user && trip && user.userId === trip.userId && request.status === 'Pending' && trip.departureTime > new Date().getTime() ?
                            <p className={styles.cancelBooking} onClick={() => cancelRequest(request.username)}>Cancel request</p> :
                            null}
                    </div>
                </TPCard>
            ))}
        </Fragment>
    );
}

export default TPUsers;
