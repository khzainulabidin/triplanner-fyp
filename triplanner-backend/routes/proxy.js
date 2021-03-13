const express = require('express');
const router = express.Router();
const {nearbyPlaces, placesDetails} = require('../controllers/proxy');

router.route('/nearbyPlacesProxy').post(nearbyPlaces);
router.route('/placeDetailsProxy').post(placesDetails);

module.exports = router;
