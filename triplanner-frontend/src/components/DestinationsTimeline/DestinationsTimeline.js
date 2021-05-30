import styles from './DestinationsTimeline.module.css';
import {Timeline} from "@material-ui/lab";
import {Fragment} from "react";
import MyTimelineItem from "../MyTimelineItem/MyTimelineItem";

const DestinationsTimeline = ({destinations, deleteDestination}) => {
    return(
        <div className={styles.container}>
            <Timeline align="alternate">
                <MyTimelineItem item={destinations[0]} connector deleteDestination={deleteDestination}/>

                {destinations.length === 2 ? (
                    <MyTimelineItem item={destinations[destinations.length-1]} deleteDestination={deleteDestination} removable/>
                ) : (
                    <Fragment>
                        {destinations.slice(1, destinations.length - 1).map((destination, index) => (
                            <MyTimelineItem key={index} item={destination} coloredDot connector deleteDestination={deleteDestination} removable/>
                        ))}
                        <MyTimelineItem item={destinations[destinations.length-1]} deleteDestination={deleteDestination} removable/>
                    </Fragment>
                )}

            </Timeline>
        </div>
    );
}

export default DestinationsTimeline;
