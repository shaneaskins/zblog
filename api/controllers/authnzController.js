const knex = require("knex")(require("../knexfile")["development"]);
const jwtGen = require("../utils/jwtGen");

/*

--- UNAUTHNZ ---

Create (POST):
- /register
- /login
- /verify

--- AUTHNZ ---

Create (POST):
- /logout

*/

module.exports = {
    postRegister: async (req, res) => {
        const { first_name, last_name, username, password } = req.body

        // Check if user already exists
        try {
            const user = await knex("users").where({ username: username }).first()

            if (user) {
                return res.status(401).json("User already exists");
            }

            knex("users")
            .insert({
                first_name: first_name,
                last_name: last_name,
                username: username,
                password: password,
            }, 'id')
            .then((id) => {
                // Generate JWT and send
                const jwtToken = jwtGen.generate(id)
                return res.status(200).json({ jwtToken })
            })
            .catch((err) => res.status(500).send("Server error"));
        }
        catch(err) {
            res.status(500).send("Server error")
        }
    },
    postLogin: (req, res) => {
        const { username, password } = req.body
        knex("users")
        .where({
            username: username,
            password: password,
        })
        .then((data) => {
            // Issue JWT
        })
        .catch((err) => res.status(400).send(err));
    },
    postLogout: (req, res) => {},
    getVerify: (req, res) => {},
}