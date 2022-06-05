module.exports = {
    isLoggedIn: (req, res, next) => {
        // Get token from header
        const token = req.header("jwt_token");
    
        // Check if not token
        if (!token) {
            return res.status(403).json({ msg: "Access denied" });
        }
    
        // Verify token
        try {
            //it is going to give use the user id (user:{id: user.id})
            const verify = jwt.verify(token, process.env.jwtSecret);
    
            res.user = verify.user;
            next();
        }
        catch(err) {
            res.status(401).json({ msg: "Token is not valid" });
        }
    },
}