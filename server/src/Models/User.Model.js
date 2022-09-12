//import
const mongoose = require("mongoose");

//user Schema
const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
  },
  { versionKey: false, timestamps: true }
);

const User = mongoose.model("users", UserSchema);

//export
module.exports = User;
