const userModel = require("../database/models/user.model");
const sendMail = require("../helper/sendEmail.helper");
const path = require("path");
const fs = require("fs");
class User {
  static addUser = async (req, res) => {
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
  static login = async (req, res) => {
    try {
      const user = await userModel.login(req.body.email, req.body.password);
      const token = await user.genrateToken();
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
  static changeProfile = async (req, res) => {
    try {
      //load user data from auth middleware
      const user = req.user;
      //to save file extension name
      const fileName =
        req.file.path + path.extname(req.file.originalname).toLowerCase();
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
