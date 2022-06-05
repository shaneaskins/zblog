const jwt = require("jsonwebtoken");
const path = require("path")
const envPath = path.join(__dirname, ".env")
require("dotenv").config({path: envPath});

module.exports = {
    generate: async (user_id) => {
        const payload = {
            user: {
                id: user_id
            }
        };

        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
    }
}