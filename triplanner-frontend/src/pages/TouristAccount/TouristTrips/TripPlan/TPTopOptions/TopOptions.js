import styles from "../TripPlan.module.css";
import {Link} from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SaveIcon from "@material-ui/icons/Save";
import TPCard from "../TPCard/TPCard";
import DeleteIcon from '@material-ui/icons/Delete';

const TopOptions = ({printPage, trip, user, deletePlan}) => {
    return(
        <TPCard className={styles.topOptions}>
            <Link to={'/trips'}><ArrowBackIcon fontSize={window.innerWidth >= 768 ? 'medium' : 'small'}/> <span>View all trips</span></Link>
            {trip.userId === user.userId && <div>
                {trip.departureTime > new Date().getTime() ? <p onClick={deletePlan}>
                    <DeleteIcon fontSize={window.innerWidth >= 768 ? 'medium' : 'small'}/>
                    {window.innerWidth >= 768 && <span> Delete plan</span>}
                </p> : <div/>}
                <p onClick={printPage}>
                    <SaveIcon fontSize={window.innerWidth >= 768 ? 'medium' : 'small'}/>
                    {window.innerWidth >= 768 && <span> Save offline</span>}
                </p>
            </div>}
        </TPCard>
    );
};

export default TopOptions;
