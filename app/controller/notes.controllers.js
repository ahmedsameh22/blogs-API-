const noteType = require("../database/models/NoteType.model");
const notes = require("../database/models/note.model");
class Post {
  static addNoteType = async (req, res) => {
    try {
      const post = new noteType({ ...req.body });
      await post.save();
      res.status(200).send({ data: post, apiStatus: true });
    } catch (e) {
      res.status(500).send({ error: e.message, apiStatus: false });
    }
  };
  static sendNote = async (req, res) => {
    try {
      const post = new noteType({ ...req.body });
      await post.save();
      res.status(200).send({ data: post, apiStatus: true });
    } catch (e) {
      res.status(500).send({ error: e.message, apiStatus: false });
    }
  };

  /*   static myposts = async (req, res) => {
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
  }; */
}
module.exports = Post;
