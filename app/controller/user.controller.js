const userModel = require("../database/models/user.model");
const sendMail = require("../helper/sendEmail.helper");
const path = require("path");
const fs = require("fs");
class User {
  static register = async (req, res) => {
    try {
      const user = new userModel(req.body);
      await user.save();
      // sendMail(user.email);
      res.status(200).send({
        data: user,
        apiStatus: true,
      });
    } catch (e) {
      res.status(500).send({
        error: e.message,
        apiStatus: false,
      });
    }
  };
  static showAll = async (req, res) => {
    try {
      let users = await userModel.find();
      res.status(200).send({
        data: users,
        apiStatus: true,
      });
    } catch (e) {
      res.status(500).send({
        error: e.message,
        apiStatus: false,
      });
    }
  };
  static showSingle = async (req, res) => {
    try {
      let user = await userModel.findById(req.params.id);
      if (!user) {
        return res.status(404).send({
          data: {},
          apiStatus: false,
          message: "user not found",
        });
      }
      res.status(200).send({
        data: user,
        apiStatus: true,
      });
    } catch (e) {
      res.status(500).send({
        error: e.message,
        apiStatus: false,
      });
    }
  };
  static login = async (req, res) => {
    try {
      const user = await userModel.login(req.body.email, req.body.password);
      const token = await user.genrateToken();
      console.log(token);
      if (user) {
        res.status(200).send({
          data: { user, token },
          apiStatus: true,
        });
      }
    } catch (e) {
      res.status(500).send({
        error: e.message,
        apiStatus: false,
        message: "invaild login",
      });
    }
  };
  static showMe = (req, res) => {
    try {
      const user = req.user;
      console.log(req.user);
      res.status(200).send({ data: user, apiStatus: true });
    } catch (e) {
      res.status(500).send({ error: e.message, apiStatus: false });
    }
  };
  static logoutAll = async (req, res) => {
    try {
      req.user.tokens = [];
      const user = req.user;
      await req.user.save();
      res.status(200).send({ data: user, apiStatus: true });
    } catch (e) {
      res.status(500).send({ error: e.message, apiStatus: false });
    }
  };
  static logout = async (req, res) => {
    try {
      const tokens = req.user.tokens;
      req.user.tokens = tokens.filter((tokenobj) => {
        return tokenobj["token"] != req.token;
      });
      const user = req.user;
      await req.user.save();
      res
        .status(200)
        .send({ data: user, apiStatus: true, message: "logout done" });
    } catch (e) {
      res
        .status(500)
        .send({ error: e.message, apiStatus: false, message: "logout failed" });
    }
  };
  static editPassword = async (req, res) => {
    try {
      if (req.body.oldpass == undefined || req.body.newpass == undefined)
        throw new Error("Enter old and new pass");
      await userModel.cheakPass(req.body.oldpass, req.body.newpass, req.user);
      res
        .status(200)
        .send({ data: req.user, apiStatus: true, message: "pass editet" });
    } catch (e) {
      res.status(500).send({ error: e.message, apiStatus: false });
    }
  };
  static edit = async (req, res) => {
    try {
      const header = ["name", "age", "gender", "phone"];
      const user = req.user;
      header.forEach((h) => {
        user[h] = req.body[h];
      });
      await user.save();
      res.status(200).send({ data: user, apiStatus: true });
    } catch (e) {
      res.status(500).send({ error: e.message, apiStatus: false });
    }
  };
  static active = async (req, res) => {
    try {
      if (req.user.status) throw new Error("already activate");
      req.user.status = true;
      await req.user.save();
      res.status(200).send({ data: req.user, apiStatus: true });
    } catch (e) {
      res.status(500).send({ error: e.message, apiStatus: false });
    }
  };
  static activeWithoutLogin = async (req, res) => {
    try {
      if (req.body.email == undefined || req.body.password == undefined)
        throw new Error("Enter email and password to activate");
      const user = await userModel.login(req.body.email, req.body.password);
      if (user.status) throw new Error("already activate");
      user.status = true;
      await user.save();
      res
        .status(200)
        .send({ data: user, apiStatus: true, message: "activate done" });
    } catch (e) {
      res.status(500).send({ error: e.message, apiStatus: false });
    }
  };
  static changeProfile = async (req, res) => {
    try {
      //load user data from auth middleware
      const user = req.user;
              //to save file extension name
      const fileName =req.file.path + path.extname(req.file.originalname).toLowerCase();
      //to save file in your dist with extension
      fs.rename(req.file.path, fileName, () => {});
      //to save file in Database with extension
      user.image = fileName;
      await user.save();
     res.status(200).send({
          data: user,
          apiStatus: true,
          message: "profile change Success",
        });
    } catch (e) {
      res.status(500).send({
          error: e.message,
          apiStatus: false,
          message: "profile change failed",
        });
    }
  };
}
module.exports = User;
