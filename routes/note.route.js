const route = require("express").Router();
const auth = require("../app/middleware/auth");
const notesController = require("../app/controller/notes.controllers");
route.post("/type", auth, notesController.addNoteType);
route.post("/sendnote", auth, notesController.sendNote);
module.exports = route;

/* const route = require("express").Router();
const postController = require("../app/controller/posts.controllers");

 */
