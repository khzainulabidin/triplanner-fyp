import styles from "../TripPlan.module.css";
import Weather from "../../../../../components/Weather/Weather";

const TPWeather = ({trip}) => {
    return(
        <div className={styles.weatherContainer}>
            {trip.destinations.slice(0, trip.destinations.length-1).map((destination, index) => (
                <Weather key={index} id={destination.id} name={destination.name}/>
            ))}
            <Weather id={trip.destinations[trip.destinations.length-1].id} name={trip.destinations[trip.destinations.length-1].name}/>
        </div>
    );
}

export default TPWeather;
