import TPCard from "../TPCard/TPCard";
import styles from "../TripPlan.module.css";
import React from "react";

const TPPrivacy = ({trip, privacy, setPrivacy, user}) => {
    return(
        <TPCard className={styles.budgetContainer}>
            <div className={'PTGridContainer'} style={{alignItems: "center"}}>
                <p>Current privacy is set to <span style={{textTransform: "capitalize"}}>{trip.privacy}</span></p>

                {user && trip && user.userId === trip.userId &&
                <select className={styles.updatePrivacy} value={privacy} onChange={e => setPrivacy(e.target.value)}>
                    <option value={'noValue'}>Update privacy</option>
                    <option value={'private'}>Private</option>
                    <option value={'friends'}>Friends</option>
                    <option value={'public'}>Public</option>
                </select>}
            </div>
        </TPCard>
    );
}

export default TPPrivacy;
