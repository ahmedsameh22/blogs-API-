const mongoose = require("mongoose");
postSchame = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    postType: {
      type: String,
      trim: true,
      required: true,
      enum: ["txt", "image", "video"],
    },
    content: {
      type: String,
      trim: true,
      required: this.postType == "txt",
    },
    file: {
      type: String,
      trim: true,
      required: function () {
        return this.postType != "txt";
      },
    },
  },
  {
    timestamps: true,
  }
);
const Post = mongoose.model("Post", postSchame);
module.exports = Post;
