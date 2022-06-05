const knex = require("knex")(require("../knexfile")["development"]);
const bcrypt = require("bcrypt");
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

            // Hash + salt password
            const salt = await bcrypt.genSalt(10);
            const bcryptPassword = await bcrypt.hash(password, salt);
            console.log(bcryptPassword);

            const id = await knex("users")
                            .insert({
                                first_name: first_name,
                                last_name: last_name,
                                username: username,
                                password: bcryptPassword,
                            }, 'id')

            // Generate JWT and send
            const jwtToken = jwtGen.generate(id)
            return res.status(200).json({ jwtToken })
        }
        catch(err) {
            res.status(500).send("Server error")
        }
    },
    postLogin: async (req, res) => {
        const { username, password } = req.body
        const plainPassword = password

        try {
            const { id, password } = await knex("users")
                                            .select("id", "password")
                                            .where({
                                                username: username,
                                            })
                                            .first()

            const validPassword = await bcrypt.compare(plainPassword, password)

            if (!validPassword) {
                return res.status(401).json("Invalid Credentials")
            }

            const jwtToken = jwtGen.generate(id)
            return res.status(200).json({ jwtToken })
        }
        catch (err) {
            return res.status(401).json("Invalid Credentials")
        }
    },
    postLogout: (req, res) => {},
    getVerify: (req, res) => {},
}