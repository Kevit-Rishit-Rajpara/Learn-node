const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const decoded = jwt.verify(req.headers.authorization.split(" ")[1], 'secret');
        req.userData = decoded;
        next();
    }
    catch {
        return res.status(401).json({
            message: "Auth failed"
        });
    }
};