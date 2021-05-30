import styles from "../TripPlan.module.css";
import {Timeline} from "@material-ui/lab";
import TPTimelineItem from "../../../../../components/TPTimelineItem/TPTimelineItem";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import {formatDate} from "../../../../../utils/misc";
import {Fragment} from "react";
import FlightLandIcon from "@material-ui/icons/FlightLand";
import RoomIcon from "@material-ui/icons/Room";
import AssistantPhotoIcon from "@material-ui/icons/AssistantPhoto";
import TPCard from "../TPCard/TPCard";
import {v4 as uuid} from 'uuid';

const TPTimeline = ({trip}) => {
    return(
        <TPCard className={styles.timelineContainer}>
            <Timeline align={'alternate'}>
                <TPTimelineItem
                    name={trip.source.name}
                    icon={<FlightTakeoffIcon/>}
                    time={formatDate(Number(trip.departureTime))}
                    desc={'You will start from here'}
                />

                {trip.destinations.map((destination, index) => (
                    <Fragment key={uuid()}>
                        <TPTimelineItem
                            name={destination.name}
                            icon={index === trip.destinations.length-1 ? <FlightLandIcon/> : <RoomIcon/>}
                            time={`After ${trip.timeDistances[index].time.text}`}
                            desc={index === trip.destinations.length-1 ? 'This is your destination' : 'You will stop here'}
                        />

                        {trip.suggestedPlacesToVisit.filter(place => place.parent === destination.id).map(place => (
                            <TPTimelineItem
                                key={uuid()}
                                name={place.name}
                                icon={<AssistantPhotoIcon/>}
                                desc={`You will visit this ${place.type}`}
                            />
                        ))}
                    </Fragment>
                ))}
            </Timeline>
        </TPCard>
    );
}

export default TPTimeline;
