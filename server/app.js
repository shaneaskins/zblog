const express = require("express");
const path = require("path")
const envPath = path.join(__dirname, ".env")
require("dotenv").config({path: envPath});

const nodeEnv = (process.env.NODE_ENV) ? process.env.NODE_ENV : "development"

const app = express();
const PORT = process.env.PORT || 3000;
//const knex = require("knex")(require("./knexfile")[nodeEnv]);
const cors = require("cors");

const authnzCtrl = require('./controllers/authnzController');
const userCtrl = require('./controllers/userController');
const postCtrl = require('./controllers/postController');

// Middleware
const authnzMW = require('./middleware/authnz');

app.use(cors());
app.use(express.json());

// Build files
if (nodeEnv === "production") {
    app.use(express.static(path.resolve(__dirname, '../client/build')));
}

/*

--- UNAUTHNZ ---

Read-Only (GET):
- /posts
- /post/:post_id

Create (POST):
- /register
- /login

--- AUTHNZ ---

Read-Only (GET):
- /dashboard
- /verify

Create (POST):
- /post/create

UD (PUT, DELETE):
- /post/:post_id

*/

// Comment out ping endpoint for production

// app.get("/api/ping", (req, res) => {
//     knex("users")
//     .select("*")
//     .then((data) => res.status(200).json(data))
//     .catch((err) =>
//         res
//         .status(404)
//         .json({
//             err:
//             "The data you are looking for could not be found. Please try again.",
//         })
//         .send()
//     );
// });

// Authnz Routes

app.get("/api/verify", authnzMW.isLoggedIn, authnzCtrl.getVerify);
app.post("/api/register", authnzCtrl.postRegister);
app.post("/api/login", authnzCtrl.postLogin);

// User Routes

app.get("/api/dashboard", authnzMW.isLoggedIn, userCtrl.getDashboard);

// "Post" Routes

app.get("/api/posts", postCtrl.getPosts);
app.post("/api/post/create", authnzMW.isLoggedIn, postCtrl.postPost);
app.get("/api/post/:post_id", postCtrl.getPost);
app.put("/api/post/:post_id", authnzMW.isLoggedIn, postCtrl.putPost);
app.delete("/api/post/:post_id", authnzMW.isLoggedIn, postCtrl.deletePost);

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
})

// Listening...

app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});