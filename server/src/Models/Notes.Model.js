//import
const mongoose = require("mongoose");

//note Schema
const noteSchema = new mongoose.Schema(
  {
    createBy: { type: String, require: true, unique: false },
    uniqueId: { type: String, require: true, unique: false },
    note: { type: String, require: false, unique: false },
    title: { type: String, require: false, unique: false },
    tags: [{ tagName: { type: String } }],
    isPublic: { type: Boolean },
  },
  { versionKey: false, timestamps: true }
);

const Note = mongoose.model("notes", noteSchema);

//export
module.exports = Note;

/*  

createby - id
public - bool
note - str
id - str - for create the unique url
title - str
tag - ["str"]
collabrater - ""




*/
