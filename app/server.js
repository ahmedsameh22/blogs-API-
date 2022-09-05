const express = require("express");
const path = require("path");
const app = express();
require("dotenv").config();
require("./database/conect");
const userRoutes = require("../routes/user.route");
const noteRoutes = require("../routes/note.route");
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // better then bodybarser
app.use(express.static(path.join(__dirname, "../public")));
app.use("/user", userRoutes);
app.use("/note", noteRoutes);
app.all("*", (req, res) => {
  res.status(500).send({ error: "invalid url segment", apiStautus: false });
});
module.exports = app;
