const express = require("express");

const app = express();
const PORT = 3001;
const knex = require("knex")(require("./knexfile")["development"]);
const cors = require("cors");

const authnzCtrl = require('./controllers/authnzController');
const userCtrl = require('./controllers/userController');
const postCtrl = require('./controllers/postController');

// Middleware
const authnzMW = require('./middleware/authnz');

app.use(cors());
app.use(express.json());

/*

--- UNAUTHNZ ---

Read-Only (GET):
- /ping
- /posts
- /post/:post_id

Create (POST):
- /register
- /login
- /verify

--- AUTHNZ ---

Read-Only (GET):
- /dashboard

Create (POST):
- /post/create

UD (PUT, DELETE):
- /post/:post_id

*/

app.get("/ping", (req, res) => {
    knex("users")
    .select("*")
    .then((data) => res.status(200).json(data))
    .catch((err) =>
        res
        .status(404)
        .json({
            err:
            "The data you are looking for could not be found. Please try again.",
        })
        .send()
    );
});

// Authnz Routes

app.get("/verify", authnzMW.isLoggedIn, authnzCtrl.getVerify);
app.post("/register", authnzCtrl.postRegister);
app.post("/login", authnzCtrl.postLogin);
//app.post("/logout", authnzMW.isLoggedIn, authnzCtrl.postLogout);

// User Routes

app.get("/dashboard", authnzMW.isLoggedIn, userCtrl.getDashboard);

// "Post" Routes

app.get("/posts", postCtrl.getPosts);
app.post("/post/create", authnzMW.isLoggedIn, postCtrl.postPost);
app.get("/post/:post_id", postCtrl.getPost);
app.put("/post/:post_id", authnzMW.isLoggedIn, postCtrl.putPost);
app.delete("/post/:post_id", authnzMW.isLoggedIn, postCtrl.deletePost);

// Listening...

app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});