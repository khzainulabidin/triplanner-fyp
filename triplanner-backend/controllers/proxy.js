const axios = require('axios');
const Place = require('../models/Place');
const shuffle = require('shuffle-array');

const getLatLng = async placeId => {
    try {
        const place = await Place.findOne({placeId});
        if (place){
            return {
                lat: place.lat,
                lng: place.lng,
            }
        }

        const apiKey = `key=${process.env.GOOGLE_MAPS_API_KEY}`;
        const place_id = `place_id=${placeId}`;

        const response = await axios.get(`${process.env.GOOGLE_GEOCODE_URL}?${apiKey}&${place_id}`);
        if (response.data.status !== 'OK'){
            return false;
        }
        const location = response.data.results[0].geometry.location;

        await Place.create({
            placeId,
            lat: location.lat,
            lng: location.lng
        });

        return location;
    }
    catch (e){
        return false;
    }
}

exports.nearbyPlaces = (req, res) => {
    const key = `key=${process.env.GOOGLE_MAPS_API_KEY}`;
    const location = `location=${req.body.latitude},${req.body.longitude}`;
    const radius = `radius=${req.body.radius}`;
    let keyword = `keyword=${req.body.keyword}`;
    const filters = req.body.filters;
    const rankBy = `rankby=prominence`;

    if (filters.length > 0){
        keyword = `keyword=${filters.join('|')}`;
    }

    const url = `${process.env.GOOGLE_NEARBY_URL}?${key}&${location}&${radius}&${rankBy}&${keyword}&type=establishment`;

    axios.get(url).then(response => {

        if (response.data.status !== 'OK'){
            return res.send({
                success: false,
                data: 'No results found'
            });
        }

        if (response.data.results.length < 1){
            return res.send({
                success: false,
                data: 'No results found'
            });
        }

        res.send({
            success: true,
            data: response.data.results,
        });
    }).catch(() => {
        res.send({
            success: false,
            data: 'Cannot get nearby places'
        })
    });
}

exports.getPlacePhoto = (req, res) => {
    const reference = req.body.reference;
    axios.get(`${process.env.GOOGLE_PHOTO_URL}&photoreference=${reference}&key=${process.env.GOOGLE_MAPS_API_KEY}`, {
        responseType: 'arraybuffer'
    }).then(photo => {
            if (!photo){
                return res.send({
                    success: false,
                    data: 'Unable to get place photo'
                });
            }
            res.send({
                success: true,
                data: photo.data,
            });
        }).catch(() => {
            return res.send({
                success: false,
                data: 'Unable to get place photo'
            });
        });
}

exports.placesDetails = (req, res) => {
    const key = `key=${process.env.GOOGLE_MAPS_API_KEY}`;
    const place_id = `place_id=${req.body.place_id}`;
    const fields = 'fields=name,types,formatted_address,geometry,photos,formatted_phone_number';

    const url = `${process.env.GOOGLE_PLACE_DETAIL_URL}?${place_id}&${fields}&${key}`;

    axios.get(url).then(response => {
        if (response.data.status !== 'OK'){
            return res.send({
                success: false,
                data: 'Unable to get place details',
            });
        }

        res.send({
            success: true,
            data: response.data.result,
        });
    }).catch(() => {
        return res.send({
            success: false,
            data: 'Unable to get place details',
        });
    });
}

exports.getTimeAndDistance = async (req, res) => {
    const {source, destinations, departureTime} = req.body;

    const apiKey = `key=${process.env.GOOGLE_MAPS_API_KEY}`;
    const origin = `origins=place_id:${source}`;
    const destination = `destinations=place_id:${destinations.join('|place_id:')}`;
    const region = `region=pk`;
    const departure_time = `departure_time=${departureTime}`;

    const url = `${process.env.GOOGLE_DISTANCE_MATRIX_URL}?${apiKey}&${origin}&${destination}&${region}&${departure_time}`;

    axios.get(url).then(response => {
        if (response.data.status !== 'OK'){
            return res.send({
                success: false,
                data: 'Unable to get time and distance',
            });
        }

        res.send({
            success: true,
            data: response.data,
        });
    }).catch(() => {
        return res.send({
            success: false,
            data: 'Unable to get time and distance',
        });
    });
}

exports.getRoute = async (req, res) => {
    const {source, destinations, departureTime} = req.body;

    const apiKey = `key=${process.env.GOOGLE_MAPS_API_KEY}`;
    const origin = `origin=place_id:${source}`;
    const destination = `destination=place_id:${destinations[destinations.length-1]}`;
    const waypoints = `waypoints=place_id:${destinations.slice(0, destinations.length-1).join('|place_id:')}`;
    const region = `region=pk`;
    const departure_time = `departure_time=${departureTime}`;

    const url = `${process.env.GOOGLE_DIRECTIONS_URL}?${apiKey}&${origin}&${destination}&${waypoints}&${region}&${departure_time}`;

    res.send({success: true, data: 'OK'});
    axios.get(url).then(response => {
        if (response.data.status !== 'OK'){
            return res.send({
                success: false,
                data: 'Unable to get route',
            });
        }

        res.send({
            success: true,
            data: response.data,
        });
    }).catch(() => {
        res.send({
            success: false,
            data: 'Unable to get route',
        });
    });
}


exports.suggestPlaces = async (req, res) => {
    try {
        const destinations = req.body.destinationIds;
        const interests = req.body.interests;
        const places = [];
        const sliceNumber = Math.ceil(12/destinations.length);

        const key = `key=${process.env.GOOGLE_MAPS_API_KEY}`;
        const radius = `radius=25000`;
        const type = `type=point_of_interest`;
        const rankBy = `rankby=prominence`;
        const basicKeywords = ['lake', 'beach', 'mountain', 'hill', 'park', 'museum'];
        const keywords = shuffle(interests.length > 0 ? interests : basicKeywords).join('|');
        const keyword = `keyword=${keywords}`;

        for (let i=0; i<destinations.length; i++){
            const locationResponse = await getLatLng(destinations[i]);
            if (locationResponse){
                const location = `location=${locationResponse.lat},${locationResponse.lng}`;
                const response = await axios.get(`${process.env.GOOGLE_NEARBY_URL}?${key}&${location}&${radius}&${keyword}&${rankBy}&${type}`);
                if (response.data.status === 'OK'){
                    const requiredPlaces = response.data.results.slice(0, sliceNumber);
                    places.push({id: destinations[i], places: [...requiredPlaces]});
                }
            }
        }

        res.send({
            success: true,
            data: places
        });
    }
    catch (e){
        res.send({
            success: true,
            data: []
        });
    }
}

exports.getLocationOfPlace = async (req, res) => {
    try {
        const response = await getLatLng(req.body.placeId);
        if (!response){
            return res.send({
                success: false,
                data: 'Unable to get location'
            });
        }

        res.send({
            success: true,
            data: response
        });
    }
    catch (e){
        res.send({
            success: false,
            data: 'Unable to get location'
        });
    }
}
