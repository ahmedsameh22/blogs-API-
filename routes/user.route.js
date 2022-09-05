const route = require("express").Router();
const auth = require("../app/middleware/auth");
const userController = require("../app/controller/user.controller");
const upload = require("../app/middleware/uploadfile");
route.post("/adduser", userController.addUser);
route.post("/login", userController.login);

/* route.get("/showall", userController.showAll);
route.get("/show/:id", userController.showSingle);
route.get("/logoutall", auth, userController.logoutAll);
route.get("/activate", auth, userController.active);
route.post(
  "/profile",
  upload.single("userImg"),
  auth,
  userController.changeProfile
); */

module.exports = route;
