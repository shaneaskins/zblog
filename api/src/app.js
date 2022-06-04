const express = require("express");

const app = express();
const PORT = 3001;
const knex = require("knex")(require("../db/knexfile.js")["development"]);
const cors = require("cors");

//middleware
app.use(cors());
app.use(express.json());

/*

--- UNAUTHNZ ---

Read-Only (GET):
- /ping
- /posts
- /post/:post_id

Create (POST):
- /login
- /register

--- AUTHNZ ---

Read-Only (GET):
- /dashboard

Create (POST):
- /logout

CRUD (GET, POST, PATCH, DELETE):
- /post/:post_id

*/

app.get("/ping", (req, res) => {
    knex("ping")
    .select("*")
    .then((data) => res.status(200).json(data))
    .catch((err) =>
        res
        .status(404)
        .json({
            message:
            "The data you are looking for could not be found. Please try again.",
        })
        .send()
    );
});

app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});