const Message = require('../models/Message');

exports.getMessages = async (req, res) => {
    try {
        const filter = req.params.type === 'tourist' ? {senderId: req._id} : {hotelId: req._id};
        const messages = await Message.find(filter);
        res.send({
            success: true,
            data: messages
        });
    }
    catch (e){
        res.send({
            success: false,
            data: 'Unable to fetch messages'
        });
    }
}

exports.postMessage = async (req, res) => {
    try {
        const message = await Message.create({
            ...req.body.message,
            senderId: req._id
        });

        res.send({
            success: true,
            data: message
        });
    }
    catch (e){
        res.send({
            success: false,
            data: 'Unable to send message'
        });
    }
}

exports.deleteMessage = async (req, res) => {
    try {
        await Message.findOneAndDelete({_id: req.params.id});

        res.send({
            success: true,
            data: 'Message deleted successfully'
        });
    }
    catch (e){
        res.send({
            success: false,
            data: 'Unable to delete message'
        });
    }
}
