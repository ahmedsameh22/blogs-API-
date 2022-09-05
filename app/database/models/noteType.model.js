const mongoose = require("mongoose");
notetypeSchema = mongoose.Schema({
  Notetype: {
    type: String,
    trim: true,
    required: true,
  },
});

const NoteType = mongoose.model("NoteType", notetypeSchema);
module.exports = NoteType;
