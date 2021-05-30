const Trip = require('../models/Trip');

exports.createTrip = async (req, res) => {
    try {
        const trip = await Trip.create({...req.body.trip, userId: req._id});
        if (!trip){
            return res.send({
                success: false,
                data: 'Unable to create trip'
            });
        }

        res.send({
            success: true,
            data: trip
        });
    }
    catch (e){
        res.send({
            success: false,
            data: 'Unable to create trip'
        });
    }
}

exports.getTripPlan = async (req, res) => {
    try {
        const trip = await Trip.findOne({_id: req.params.tripId});
        if (!trip){
            return res.send({
                success: false,
                data: 'Unable to fetch trip plan'
            });
        }

        res.send({
            success: true,
            data: trip
        });
    }
    catch (e){
        res.send({
            success: false,
            data: 'Unable to fetch trip plan'
        });
    }
}

exports.updateTrip = async (req, res) => {
    try {
        const trip = await Trip.findOneAndUpdate(
            {_id: req.body.tripId},
            {...req.body.update, lastModified: Date.now()},
            {new: true, runValidators: true}
        );
        if (!trip){
            return res.send({
                success: false,
                data: 'Unable to update trip'
            });
        }

        res.send({
            success: true,
            data: trip
        });
    }
    catch (e){
        res.send({
            success: false,
            data: 'Unable to update trip'
        });
    }
}

exports.getTrips = async (req, res) => {
    try {
        const trips = await Trip.find({userId: req._id});
        if (!trips){
            return res.send({
                success: true,
                data: []
            });
        }

        res.send({
            success: true,
            data: trips
        });
    }
    catch (e){
        res.send({
            success: false,
            data: 'Unable to fetch trips'
        })
    }
}

exports.getOtherTrip = async (req, res) => {
    try {
        const trips = await Trip.find(
            {'usersAccompanying.0': {'$exists': true}, 'usersAccompanying.username': req.params.username}
        );
        if (!trips){
            return res.send({
                success: true,
                data: []
            });
        }

        res.send({
            success: true,
            data: trips
        });
    }
    catch (e){
        res.send({
            success: false,
            data: 'Unable to fetch requests'
        });
    }
}

exports.updateJoinRequest = async (req, res) => {
    try {
        const trip = await Trip.findOneAndUpdate(
            {_id: req.body.tripId, 'usersAccompanying.username': req.body.username},
            {$set: {'usersAccompanying.$.status': req.body.status}},
            {new: true, runValidators: true}
        );
        if (!trip){
            return res.send({
                success: false,
                data: 'Unable to update request'
            });
        }

        res.send({
            success: true,
            data: trip
        });
    }
    catch (e){
        res.send({
            success: false,
            data: 'Unable to update request'
        });
    }
}

exports.deletePlan = async (req, res) => {
    try {
        const trip = await Trip.findOneAndDelete({_id: req.params.tripId});
        if (!trip){
            return res.send({
                success: false,
                data: 'Unable to delete plan'
            });
        }

        res.send({
            success: true,
            data: 'Trip deleted successfully'
        });
    }
    catch (e){
        res.send({
            success: false,
            data: 'Unable to delete plan'
        });
    }
}

exports.getAverageBudget = async (req, res) => {
    try {
        const {source, destination} = req.params;
        const trips = await Trip.find({'source.name': source, 'destination.name': destination});
        if (!trips || trips.length === 0){
            return res.send({
                success: false,
                data: 'No trips found'
            });
        }

        let budget = 0;
        for (let i=0; i<trips.length; i++){
            budget = budget + Number(trips[i].totalBudget);
        }
        budget = Math.floor(budget/trips.length);

        res.send({
            success: true,
            data: budget
        });
    }
    catch (e){
        res.send({
            success: false,
            data: 'No trips found'
        });
    }
}

exports.getAllTrips = async (req, res) => {
    try {
        const trips = await Trip.find({});
        if (!trips){
            return res.send({
                success: true,
                data: []
            });
        }

        res.send({
            success: true,
            data: trips
        });
    }
    catch (e){
        res.send({
            success: true,
            data: []
        });
    }
}


exports.getCommonTrips = async (req, res) => {
    try {
        const {destination} = req.params;
        const trips = await Trip.find({'destinations.name': destination, privacy: 'public'});
        if (!trips){
            return res.send({
                success: true,
                data: []
            });
        }

        res.send({
            success: true,
            data: trips
        });
    }
    catch (e){
        res.send({
            success: true,
            data: []
        });
    }
}
