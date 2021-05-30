import styles from './MyTimelineItem.module.css';
import {TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator} from "@material-ui/lab";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";

const MyTimelineItem = ({item, coloredDot, connector, removable, deleteDestination}) => {
    return(
        <TimelineItem>
            <TimelineSeparator>
                {coloredDot ? <TimelineDot variant="outlined" color="secondary" /> : <TimelineDot variant="outlined"/>}
                {connector && <TimelineConnector/>}
            </TimelineSeparator>
            <TimelineContent>
                <div className={styles.timelineItem}>
                    {item.name}
                    {removable && <CloseIcon className={styles.icon} fontSize={'small'} onClick={() => deleteDestination(item.id)}/>}
                </div>
            </TimelineContent>
        </TimelineItem>
    );
}

export default MyTimelineItem;
