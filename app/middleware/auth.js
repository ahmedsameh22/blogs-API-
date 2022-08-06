const jwt = require("jsonwebtoken");
const userModel = require("../database/models/user.model");
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Baerer ", "");
    const decode = jwt.verify(token, process.env.JWT);
    const user = await userModel.findOne({
      _id: decode._id,
      "tokens.token": token,
    });
    if (!user) throw new Error("user not found");
    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    res.status(500).send({
      error: e.message,
      apiStatus: false,
      message: "invaild autharithon",
    });
  }
};
module.exports = auth;
