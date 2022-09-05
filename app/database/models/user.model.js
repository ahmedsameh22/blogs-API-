const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const userSchame = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  image: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "email is required to register "],
    validate(value) {
      if (!validator.isEmail(value)) throw new Error("invaild email");
    },
  },
  password: {
    type: String,
    trim: true,
    required: [true, "required password"],
  },
  tokens: [
    {
      token: {
        type: String,
        trim: true,
        required: true,
      },
    },
  ],
  notes: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Note", required: false },
  ],
});
userSchame.statics.login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("invaild email");
  if (password != user.password) throw new Error("invaild pass");
  return user;
};
userSchame.methods.genrateToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};
const User = mongoose.model("User", userSchame);
module.exports = User;
