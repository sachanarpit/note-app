const express = require("express");
const cors = require("cors");

const connet = require("./configs/db");

const app = express();

require("dotenv").config();

//controller import
const userController = require("./Controllers/User.controller");
const noteController = require("./controllers/Note.Controller");

let port = process.env.PORT;
//middleware

//cors middleware
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

app.use("", userController);
app.use("/note", noteController);
// app.use("/review", reviewController);
// app.use("/videos", videoDataController);

// server start

const start = async () => {
  await connet();
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

//export
module.exports = start;
