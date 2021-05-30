const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token){
        return res.status(401).json({
            success: false,
            data: 'Unable to authenticate'
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error){
            return res.status(401).json({
                success: false,
                data: 'Unable to authenticate'
            });
        }

        req._id = decoded._id;
        next();
    })
}

module.exports = protect;