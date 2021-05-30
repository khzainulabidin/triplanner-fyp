import React from "react";
import NearbyPlaces from "../../../components/NearbyPlaces/NearbyPlaces";
import NavBar from "../../../components/NavBar/NavBar";

const AllPlaces = () => {

    return(
        <React.Fragment>
            <NavBar/>
            <NearbyPlaces/>
        </React.Fragment>
    )
}

export default AllPlaces;