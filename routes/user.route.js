const route = require("express").Router();
const auth = require("../app/middleware/auth");
const userController = require("../app/controller/user.controller");
const upload = require("../app/middleware/uploadfile");
route.post("/register", userController.register);
route.get("/showall", userController.showAll);
route.get("/show/:id", userController.showSingle);
route.post("/login", userController.login);
route.get("/showme", auth, userController.showMe);
route.get("/logoutall", auth, userController.logoutAll);
route.get("/logout", auth, userController.logout);
route.patch("/editPassword", auth, userController.editPassword);
route.patch("/edit", auth, userController.edit);
route.get("/activate", auth, userController.active);
route.post("/activeWithoutLogin", userController.activeWithoutLogin);


route.post( "/profile", upload.single("userImg"),auth,userController.changeProfile);

module.exports = route;
