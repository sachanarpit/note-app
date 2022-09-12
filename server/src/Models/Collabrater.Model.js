//import
const mongoose = require("mongoose");

//note Schema
const collbraterSchema = new mongoose.Schema(
  {
    noteId: { type: String, require: true },
    userEmail: { type: String, require: true },
    access: { type: String, require: true },
  },
  { versionKey: false, timestamps: true }
);

const Collabrater = mongoose.model("collabrator", collbraterSchema);

//export
module.exports = Collabrater;
