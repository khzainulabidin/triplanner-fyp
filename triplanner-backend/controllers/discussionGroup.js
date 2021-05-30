const DiscussionGroup = require('../models/DiscussionGroup');

exports.getGroup = async (req, res) => {
    try {
        const {destinationId, departureTime} = req.params;
        let group = await DiscussionGroup.findOne({destinationId, departureTime});
        if (!group){
            return res.send({
                success: false,
                data: 'No groups found'
            });
        }

        res.send({
            success: true,
            data: group
        });
    }
    catch (e){
        res.send({
            success: false,
            data: 'No groups found'
        });
    }
}

exports.sendMessage = async (req, res) => {
    try {
        const {destinationId, departureTime, message} = req.body;

        let group = await DiscussionGroup.findOneAndUpdate(
            {destinationId, departureTime},
            {$push: {messages: message}},
            {new: true, runValidators: true}
        );

        if (!group){
            group = await DiscussionGroup.create({
                destinationId,
                departureTime,
                messages: [message]
            });
        }

        res.send({
            success: true,
            data: group
        });
    }
    catch (e){
        res.send({
            success: false,
            data: 'Message not sent'
        });
    }
}
