import styles from "../TripPlan.module.css";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import {formatDate} from "../../../../../utils/misc";
import TPCard from "../TPCard/TPCard";

const SourceDestInfo = ({trip}) => {
    return(
        <TPCard className={styles.sourceDestInfo}>
            <h1>{trip.source.name} <span><ArrowRightAltIcon fontSize={"large"}/></span> {trip.destinations[trip.destinations.length-1].name}</h1>
            <p>{formatDate(Number(trip.departureTime))}</p>
        </TPCard>
    );
}

export default SourceDestInfo;
