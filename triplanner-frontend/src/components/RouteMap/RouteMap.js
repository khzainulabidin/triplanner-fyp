import {DirectionsRenderer, GoogleMap} from "@react-google-maps/api";
import React, {useEffect, useState} from "react";

const RouteMap = ({source, destinationIds, setError}) => {
    const [directions, setDirections] = useState(null);

    const fetchRoute = async () => {
        const directionsService = new window.google.maps.DirectionsService();

        const origin = source.id;
        const destination = destinationIds[destinationIds.length-1];
        const waypoints = [];

        for (let i=0; i<destinationIds.length-1; i++){
            waypoints.push({location: {placeId: destinationIds[i]}, stopover: true});
        }

        await directionsService.route(
            {
                origin: {placeId: origin},
                destination: {placeId: destination},
                travelMode: window.google.maps.TravelMode.DRIVING,
                waypoints: waypoints,
                optimizeWaypoints: true,
                region: 'pk',
            },
            (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    setDirections(result);
                } else {
                    setError('Unable to fetch trip route');
                }
            }
        );
    }

    useEffect(() => {
        fetchRoute().catch(() => setError('Unable to fetch trip route'));
        //eslint-disable-next-line
    }, []);

    return(
        <div style={{width: '100%', height: '500px', marginBottom: '2%'}}>
            <GoogleMap
                clickableIcons={false}
                tilt={45}
                mapContainerStyle={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '20px',
                    //boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
                }}
                zoom={6}
                center={{lat: 0, lng: 0}}
            >
                <DirectionsRenderer directions={directions}/>
            </GoogleMap>
        </div>
    );
}

export default RouteMap;
