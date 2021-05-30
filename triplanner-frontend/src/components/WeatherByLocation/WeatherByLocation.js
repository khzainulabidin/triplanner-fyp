import ReactWeather, {useOpenWeather} from "react-open-weather";
import React from "react";
import {Fade} from 'react-reveal';

const WeatherByLocation = ({location}) => {
    const {data, isLoadingWeather, errorMessage} = useOpenWeather({
        key: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
        lat: location.lat,
        lon: location.lng,
        lang: 'en',
        unit: 'metric',
    });

    return(
        <Fade>
            <ReactWeather
                isLoading={isLoadingWeather}
                errorMessage={errorMessage}
                data={data}
                lang="en"
                locationLabel={'Current Location'}
                unitsLabels={{temperature: 'C', windSpeed: 'Km/h'}}
                showForecast
            />
        </Fade>
    );
}

export default WeatherByLocation;
