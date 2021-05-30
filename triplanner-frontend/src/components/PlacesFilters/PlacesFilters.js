import React from "react";
import Filter from "../Filter/Filter";

const PlacesFilters = () => {
    return(
        <React.Fragment>
            <Filter name={'Restaurant'}/>
            <Filter name={'Park'}/>
            <Filter name={'Landmark'}/>
            <Filter name={'Museum'}/>
            <Filter name={'Transit Station'}/>
            <Filter name={'Gym'}/>
            <Filter name={'Hospital'}/>
            <Filter name={'Zoo'}/>
            <Filter name={'Gas Station'}/>
            <Filter name={'Library'}/>
            <Filter name={'Shopping Mall'}/>
            <Filter name={'ATM'}/>
            <Filter name={'Place of Worship'}/>
        </React.Fragment>
    );
};

export default PlacesFilters;