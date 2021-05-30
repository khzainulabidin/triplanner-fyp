import {
    TimelineConnector, TimelineContent,
    TimelineDot,
    TimelineItem,
    TimelineOppositeContent,
    TimelineSeparator
} from "@material-ui/lab";
import styles from "../../pages/TouristAccount/TouristTrips/TripPlan/TripPlan.module.css";

const TPTimelineItem = ({time, name, desc, icon}) => {
    return(
        <TimelineItem>
            <TimelineOppositeContent>
                <p className={styles.timelineTime}>{time}</p>
            </TimelineOppositeContent>

            <TimelineSeparator>
                <TimelineDot>
                    {icon}
                </TimelineDot>
                <TimelineConnector style={{height: '90px'}}/>
            </TimelineSeparator>

            <TimelineContent>
                <div className={styles.timelineCard}>
                    <h4>{name}</h4>
                    <p>{desc}</p>
                </div>
            </TimelineContent>
        </TimelineItem>
    );
}

export default TPTimelineItem;
