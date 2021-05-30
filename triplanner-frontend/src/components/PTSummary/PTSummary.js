import React from "react";
import MyModal from "../MyModal/MyModal";
import styles from './PTSummary.module.css';

const PTSummary = ({inputs, open, setOpen, titleHidden}) => {
    return(
        <MyModal open={open} setOpen={setOpen} buttonsHidden={true}>
            {!titleHidden && <h1 className={styles.heading}><span>Trip summary</span> so far</h1>}
            <div className={styles.data}>
                {inputs.source.name && <div>
                    <b>Source:</b>
                    <p>{inputs.source.name}</p>
                </div>}

                {inputs.destinations.length>0 && <div>
                    <b>Destinations: </b>
                    <p>{inputs.destinations.map((destination, index) =>
                        <span key={index}>{destination.name}{index === inputs.destinations.length-1 ? '' : ' | '}</span>
                    )}</p>
                </div>}

                {inputs.totalBudget && <div>
                    <b>Total budget:</b>
                    <p>PKR {inputs.totalBudget}</p>
                </div>}

                {inputs.availableBudget && <div>
                    <b>Available:</b>
                    <p>PKR {inputs.availableBudget}</p>
                </div>}

                {inputs.usersAccompanying.length>0 && <div>
                    <b>Friends:</b>
                    <p>{inputs.usersAccompanying.map((user, index) =>
                        <span key={index}>{user.username}{index === inputs.usersAccompanying.length-1 ? '' : ' | '}</span>
                    )}</p>
                </div>}

                {inputs.suggestedPlacesToVisit.length>0 && <div>
                    <b>Places:</b>
                    <p>{inputs.suggestedPlacesToVisit.map((place, index) =>
                        <span key={index}>{place.name}{index === inputs.suggestedPlacesToVisit.length-1 ? '' : ' | '}</span>
                    )}</p>
                </div>}

                {inputs.selectedRooms.length>0 && <div>
                    <b>Rooms:</b>
                    <p>{inputs.selectedRooms.map((room, index) =>
                        <span key={index}><span style={{textTransform: "capitalize"}}>{room.room.type}</span> room in {room.hotel.city}{index === inputs.selectedRooms.length-1 ? '' : ' | '}</span>
                    )}</p>
                </div>}
            </div>
        </MyModal>
    );
};

export default PTSummary;
