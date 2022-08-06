const mongoose = require("mongoose");
const validator = require("validator");
const bCrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchame = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
      validate(val) {
        if (!validator.isEmail(val)) throw new Error("invalid Email");
      },
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
      required: true,
      validate(val) {
        if (!validator.isMobilePhone(val, "ar-EG"))
          throw new Error("is not valid mobile phone");
      },
    },
    age: {
      type: Number,
      required: true,
      min: 21,
      max: 60,
    },
    gender: {
      type: String,
      trim: true,
      required: true,
      enum: ["male", "female"],
    },
    status: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      trim: true,
    },
    adresses: [
      {
        addType: { type: String, trim: true, required: true },
        addDetailes: { type: String, trim: true, required: true },
        bildingNum: { type: Number, required: true, min: 1, max: 100 },
      },
    ],
    tokens: [
      {
        token: {
          type: String,
          trim: true,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
userSchame.virtual("myPosts", {
  ref: "Post",
  localField: "_id",
  foreignField: "usreId",
});
userSchame.pre("save", async function () {
  const userData = this;

  if (userData.isModified("password"))
    try {
      const pass = this.password;
      userData.password = await bCrypt.hash(pass, 10);
    } catch (e) {
      console.log(e.message);
    }
});
userSchame.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.__v;
  return user;
};
userSchame.statics.login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("invaild email");
  const confPass = await bCrypt.compare(password, user.password);
  console.log(confPass);

  if (!confPass) throw new Error("invaild email");
  return user;
};
userSchame.methods.genrateToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};
userSchame.statics.cheakPass = async (oldPass, newPass, user) => {
  const userpass = user.password;
  const isvaild = await bCrypt.compare(oldPass, userpass);
  console.log(isvaild);
  if (!isvaild) throw new Error("old password not coorect");
  user.password = newPass;
  await user.save();
};

const User = mongoose.model("User", userSchame);
module.exports = User;
