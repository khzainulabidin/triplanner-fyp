const express = require('express');
const router = express.Router();
const {nearbyPlaces, getPlacePhoto, placesDetails, getTimeAndDistance, getRoute, suggestPlaces, getLocationOfPlace} = require('../controllers/proxy');

router.post('/nearbyPlaces', nearbyPlaces);
router.post('/placePhoto', getPlacePhoto);
router.post('/placeDetails', placesDetails);
router.post('/timeAndDistance', getTimeAndDistance);
router.post('/route', getRoute);
router.post('/suggestPlaces', suggestPlaces);
router.post('/getLocation', getLocationOfPlace);

module.exports = router;
