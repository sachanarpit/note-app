//import
const mongoose = require("mongoose");
require("dotenv").config();
const uri = process.env.URI;

//connect
const connect = () => {
  return mongoose.connect(uri);
};

//export
module.exports = connect;
