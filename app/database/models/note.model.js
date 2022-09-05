const mongoose = require("mongoose");
NoteSchame = mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: { type: String, trim: true, required: true },
    body: { type: String, trim: true, required: true },
    typeOfNote: {},
    file: [
      {
        type: String,
        trim: true,
        required: true,
      },
    ],
    To: {
      type: String,
      trim: true,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", NoteSchame);
module.exports = Note;
