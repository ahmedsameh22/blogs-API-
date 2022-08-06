const postModel = require("../database/models/post.model");
class Post {
  static addPost = async (req, res) => {
    try {
      const post = new postModel({ ...req.body, userId: req.user._id });
      await post.save();
      res.status(200).send({ data: post, apiStatus: true });
    } catch (e) {
      res.status(500).send({ error: e.message, apiStatus: false });
    }
  };
  static allPost = async (req, res) => {
    try {
      const posts = await postModel.find();
      res.status(200).send({ data: posts, apiStatus: true });
    } catch (e) {
      res.status(500).send({ error: e.message, apiStatus: false });
    }
  };
  static myposts = async (req, res) => {
    try {
      const posts = await postModel.find({ userId: req.user._id });
      res.status(200).send({ data: posts, apiStatus: true });
    } catch (e) {
      res.status(500).send({ error: e.message, apiStatus: false });
    }
  };
  static mypostsVertual = async (req, res) => {
    try {
      const posts = await req.user.populate("myPosts");
      res.status(200).send({ data: posts, apiStatus: true });
    } catch (e) {
      res.status(500).send({ error: e.message, apiStatus: false });
    }
  };
}
module.exports = Post;
