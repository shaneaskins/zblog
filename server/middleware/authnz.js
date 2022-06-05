const jwt = require("jsonwebtoken");
const path = require("path")
const envPath = path.join(__dirname, "../", ".env")
require("dotenv").config({path: envPath});

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
                    msg: "Unauthorized",
                });
            }

            const verify = jwt.verify(token, process.env.JWT_SECRET);
    
            res.user = { ...verify.user, success: true };
            next();
        }
        catch(err) {
            res.status(401).json({
                success: false,
                msg: "Unauthenticated",
            });
        }
    },
}