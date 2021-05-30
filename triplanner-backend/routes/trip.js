const express = require('express');
const router = express.Router();
const protect = require('../middlewares/protect');
const {createTrip, getTripPlan, updateTrip, getCommonTrips, getTrips, getOtherTrip, updateJoinRequest, getAllTrips, deletePlan, getAverageBudget} = require('../controllers/trip');

router.post('/', protect, createTrip);
router.get('/getAllTrips', protect, getAllTrips);
router.get('/:tripId', protect, getTripPlan);
router.put('/', protect, updateTrip);
router.get('/', protect, getTrips);
router.get('/getOtherTrip/:username', protect, getOtherTrip);
router.put('/updateJoinRequest', protect, updateJoinRequest);
router.delete('/:tripId', protect, deletePlan);
router.get('/getAverageBudget/:source/:destination', protect, getAverageBudget);
router.get('/getCommonTrips/:destination', protect, getCommonTrips)

module.exports = router;
