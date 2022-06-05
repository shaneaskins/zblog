const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
    isLoggedIn: (req, res, next) => {
        // Verify token
        try {
            // Get token from header
            const token = req.header("authorization").replace('Bearer ', '');
        
            // Check if not token
            if (!token) {
                return res.status(403).json({
                    success: false,
                    err: "Unauthorized",
                });
            }

            const verify = jwt.verify(token, process.env.jwtSecret);
    
            res.user = { ...verify.user, success: true };
            next();
        }
        catch(err) {
            res.status(401).json({
                success: false,
                err: "Unauthenticated",
            });
        }
    },
}