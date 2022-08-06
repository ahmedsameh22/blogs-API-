const route = require("express").Router();
const postController = require("../app/controller/posts.controllers");
const auth = require("../app/middleware/auth");
route.post("/add", auth, postController.addPost);
route.get("/all", auth, postController.allPost);
route.get("/myposts", auth, postController.myposts);
route.get("/mypostver", auth, postController.mypostsVertual);
module.exports = route;
