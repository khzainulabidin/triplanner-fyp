import styles from "../TripPlan.module.css";
import {Link} from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SaveIcon from "@material-ui/icons/Save";
import TPCard from "../TPCard/TPCard";
import DeleteIcon from '@material-ui/icons/Delete';

const TopOptions = ({printPage, trip, user, deletePlan}) => {
    return(
        <TPCard className={styles.topOptions}>
            <Link to={'/trips'}><ArrowBackIcon/> <span>View all trips</span></Link>
            {trip.userId === user.userId && <div>
                <p onClick={printPage}><SaveIcon/> <span>Save offline</span></p>
                <p onClick={deletePlan}><DeleteIcon/> <span>Delete plan</span></p>
            </div>}
        </TPCard>
    );
}

export default TopOptions;
