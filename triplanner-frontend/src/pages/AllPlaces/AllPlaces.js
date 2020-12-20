import React from "react";
import NearbyPlaces from "../../components/NearbyPlaces/NearbyPlaces";
import {selectIsLoggedIn, selectLocation, selectUser} from "../../redux/slices/user/user";
import {useSelector} from "react-redux";
import NavBar from "../../components/NavBar/NavBar";

const AllPlaces = () => {
    const location = useSelector(selectLocation);
    const user = useSelector(selectUser);
    const isLoggedIn = useSelector(selectIsLoggedIn);

    return(
        <React.Fragment>
            <NavBar search={true} isLoggedIn={isLoggedIn} user={user}/>
            <NearbyPlaces location={{
                lat: location.lat,
                lng: location.lng,
            }}/>
        </React.Fragment>
    )
}

export default AllPlaces;