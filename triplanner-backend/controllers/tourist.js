const Tourist = require('../models/Tourist');
const User = require('../models/User');

exports.updateInterests = (req, res) => {
    updateTourist(req, res, {interests: req.body.interests}, 'Interests').catch(() => {
        res.send({
            success: false,
            data: `Unable to update interests`,
        });
    });
}

exports.updateProfile = (req, res) => {
    const {gender, dob, city, phone} = req.body;
    updateTourist(req, res, {gender, dob, city, phone}, 'Profile').catch(() => {
        res.send({
            success: false,
            data: `Unable to update profile`,
        });
    });
}

exports.requestToJoin = async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if (!user){
            return res.send({
                success: false,
                data: 'Unable to send join request'
            });
        }

        const request = await Tourist.findOneAndUpdate(
            {userId: user._id},
            {$push: {tripJoinRequests: req.body.tripId}},
            {new: true, runValidators: true}
        );
        if (!request){
            return res.send({
                success: false,
                data: 'Unable to send join request',
            });
        }

        res.send({
            success: true,
            data: 'Request sent successfully',
        });
    }
    catch (e){
        res.send({
            success: false,
            data: 'Unable to send join request'
        });
    }
}

exports.updateFriend = async (req, res) => {
    try {
        let user, otherUserId;
        const {username, status} = req.body;

        if (status === 'Pending'){
            await Tourist.findOneAndUpdate(
                {userId: req._id},
                {$push: {friends: {username, status}}},
                {new: true, runValidators: true}
            );

            user = await User.findOne({_id: req._id});
            otherUserId = await User.findOne({username});

            await Tourist.findOneAndUpdate(
                {userId: otherUserId._id},
                {$push: {friendRequests: {username: user.username, status}}},
                {new: true, runValidators: true}
            );
        }
        else if (status === 'Removed' || status === 'Declined' || status === 'Cancelled'){
            await Tourist.findOneAndUpdate(
                {userId: req._id},
                {$pull: {friends: {username}}},
                {new: true, runValidators: true, multi: true}
            );

            await Tourist.findOneAndUpdate(
                {userId: req._id},
                {$pull: {friendRequests: {username}}},
                {new: true, runValidators: true, multi: true}
            );

            user = await User.findOne({_id: req._id});
            otherUserId = await User.findOne({username});

            await Tourist.findOneAndUpdate(
                {userId: otherUserId._id},
                {$pull: {friendRequests: {username: user.username}}},
                {new: true, runValidators: true, multi: true}
            );

            await Tourist.findOneAndUpdate(
                {userId: otherUserId._id},
                {$pull: {friends: {username: user.username}}},
                {new: true, runValidators: true, multi: true}
            );
        }
        else {
            await Tourist.findOneAndUpdate(
                {userId: req._id, 'friends.username': username},
                {$set: {'friends.$.status': status}},
                {new: true, runValidators: true, multi: true}
            );

            await Tourist.findOneAndUpdate(
                {userId: req._id, 'friendRequests.username': username},
                {$set: {'friendRequests.$.status': status}},
                {new: true, runValidators: true}
            );

            user = await User.findOne({_id: req._id});
            otherUserId = await User.findOne({username});

            await Tourist.findOneAndUpdate(
                {userId: otherUserId._id, 'friendRequests.username': user.username},
                {$set: {'friendRequests.$.status': status}},
                {new: true, runValidators: true}
            );

            await Tourist.findOneAndUpdate(
                {userId: otherUserId._id, 'friends.username': user.username},
                {$set: {'friends.$.status': status}},
                {new: true, runValidators: true}
            );
        }

        res.send({
            success: true,
            data: 'Friend updated successfully'
        });
    }
    catch (e){
        console.log(e.message);
        res.send({
            success: false,
            data: 'Unable to update friend'
        })
    }
}

const updateTourist = async (req, res, update, type) => {
    try {
        const tourist = await Tourist.findOneAndUpdate(
            {userId: req._id},
            update,
            {new: true, runValidators: true}
        );
        if (!tourist){
            return res.send({
                success: false,
                data: `Unable to update ${type}`,
            });
        }

        res.send({
            success: true,
            data: `${type} updated successfully`,
        });
    }
    catch (e){
        res.send({
            success: false,
            data: `Unable to update ${type}`,
        });
    }
}
