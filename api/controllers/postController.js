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
    getPosts: (req, res) => {},
    getPost: (req, res) => {},
    postPost: (req, res) => {},
    putPost: (req, res) => {},
    deletePost: (req, res) => {},
}