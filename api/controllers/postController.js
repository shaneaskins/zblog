const knex = require("knex")(require("../knexfile")["development"]);
const moment = require("moment")

/*

--- UNAUTHNZ ---

Read-Only (GET):
- /posts
- /post/:post_id

--- AUTHNZ ---

Create (POST):
- /post/create

UD (PUT, DELETE):
- /post/:post_id

*/

module.exports = {
    getPosts: (req, res) => {
        knex("posts")
        .select("*")
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(500).send("Server error"));
    },
    getPost: (req, res) => {
        const id = req.params.post_id;
        knex("posts")
        .select("*")
        .where({
            id: id
        })
        .then((data) => {
            if (!data || data.length === 0) {
                return res.status(404)
                .json({
                    err:
                    "The data you are looking for could not be found. Please try again.",
                })
                .send()
            }
            return res.status(200).json(data)
        })
        .catch((err) => res.status(500).send("Server error"));
    },
    postPost: (req, res) => {
        const { title, content } = req.body;
        const user_id = res.user.id;
        const date_created = moment().format();
        const date_modified = date_created;

        knex("posts")
        .insert({
            user_id: user_id,
            title: title,
            content: content,
            date_created: date_created,
            date_modified: date_modified,
        }, 'id')
        .then(( [ { id } ] ) => res.status(200).json(id))
        .catch((err) => res.status(500).send("Server error"));
    },
    putPost: (req, res) => {
        const { title, content } = req.body;
        const user_id = res.user.id;
        const id = req.params.post_id;
        const date_modified = moment().format();

        knex("posts")
        .where({
            id: id,
        })
        .andWhere({
            user_id: user_id,
        })
        .update({
            title: title,
            content: content,
            date_modified: date_modified,
        }, 'id')
        .then(( [ { id } ] ) => res.status(200).json(id))
        .catch((err) => res.status(500).send("Server error"));
    },
    deletePost: (req, res) => {
        const user_id = res.user.id;
        const id = req.params.post_id;
        knex("posts")
        .where({
            id: id
        })
        .andWhere({
            user_id: user_id,
        })
        .del()
        .then((data) => {
            if (!data) {
                return res.status(403).json({
                    success: false,
                    err: "Unauthorized",
                });
            }
            return res.status(200).json({
                success: true,
                msg: "Post deleted",
            });
        })
        .catch((err) => res.status(500).send("Server error"))
    },
}