import ReactWeather, {useOpenWeather} from "react-open-weather";
import {useEffect, useState} from "react";
import axios from "axios";
import {GET_LOCATION} from "../../utils/routes";

const Weather = ({id, name}) => {
    const [location, setLocation] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const fetchLocation = async () => {
        setIsLoading(true);
        const res = await axios.post(GET_LOCATION, {placeId: id});
        const data = res.data;
        setLocation(data.data);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchLocation().catch(() => setIsLoading(false));
        //eslint-disable-next-line
    }, [])

    const { data, isLoadingWeather, errorMessage } = useOpenWeather({
        key: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
        lat: location.lat,
        lon: location.lng,
        lang: 'en',
        unit: 'metric',
    });

    return(
        isLoading ? null : (
            <div style={{height: '50%'}}>
                <ReactWeather
                    isLoading={isLoadingWeather}
                    errorMessage={errorMessage}
                    data={data}
                    lang="en"
                    locationLabel={name.split(',')[0]}
                    unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
                    showForecast
                />
            </div>
        )
    );
}

export default Weather;
