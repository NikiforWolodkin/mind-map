const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { secretKey } = require('../config');

module.exports = function(req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }

    if (mongoose.connection.readyState !== 1) {
        next();
    }

    try {
        const token = req.headers.authentication.split(" ")[1];
        if (!token) {
            return res.status(403).json({message: "User is not authorized"});
        }
        const decodedData = jwt.verify(token, secretKey);
        req.user = decodedData;
        next();
    }
    catch (e) {
        console.log(e);
        return res.status(403).json({message: "User is not authorized"});
    }
}