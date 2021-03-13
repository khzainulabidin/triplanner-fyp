const axios = require('axios');

exports.nearbyPlaces = (req, res, next) => {
    const key = `key=${process.env.GOOGLE_MAPS_API_KEY}`;
    const location = `location=${req.body.latitude},${req.body.longitude}`;
    const radius = `radius=${req.body.radius}`;
    const keyword = `keyword=${req.body.keyword}`;

    const url = `${process.env.GOOGLE_MAPS_BASE_URL}${process.env.GOOGLE_MAPS_NEARBY_ROUTE}?${key}&${location}&${radius}&${keyword}&type=`;
    const api = axios.create({
        baseURL: url
    });

    api.get('/').then(response => {
        res.send({
            success: true,
            response: response.data.results,
        });
    }).catch(err => console.log(err.message));
}

exports.placesDetails = (req, res, next) => {
    const key = `key=${process.env.GOOGLE_MAPS_API_KEY}`;
    const place_id = `place_id=${req.body.place_id}`;

    const url = `${process.env.GOOGLE_MAPS_BASE_URL}${process.env.GOOGLE_MAPS_DETAIL_ROUTE}?${key}&${place_id}&type=`;
    const api = axios.create({
        baseURL: url
    });

    api.get('/').then(response => {
        res.send({
            success: true,
            response: response.data,
        });
    }).catch(err => console.log(err.message));
}