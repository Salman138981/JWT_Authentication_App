const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
    try {
        let token;
        let authHeader = req.headers.authorization || req.headers.Authorization;

        if (!authHeader) {
            return res.status(400).json({
                isError: true,
                message: "Authorization header not provided",
            });
        }

        token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(400).json({
                isError: true,
                message: "Token Required",
            });
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    isError: true,
                    message: "Unauthorized",
                });
            }

            req.user = decoded.user;
            next();
        });
    } catch (err) {
        return res.status(500).json({
            isError: true,
            message: err.message,
        });
    }
};

module.exports = validateToken;
