const nodeEnv = (process.env.NODE_ENV) ? process.env.NODE_ENV : "development"

const knex = require("knex")(require("../knexfile")[nodeEnv]);

/*

--- AUTHNZ ---

Read-Only (GET):
- /dashboard

*/

module.exports = {
    getDashboard: (req, res) => {
        const user_id = res.user.id;
        knex("posts")
        .select("*")
        .where({
            user_id: user_id,
        })
        .then((data) => res.status(200).json(data))
        .catch((err) => {
            res.status(500)
            .json({
                success: false,
                msg: "Server error",
            })
        });
    },
}