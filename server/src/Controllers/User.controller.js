//import
const express = require("express");
const User = require("../Models/User.Model");
const sendmail = require("../utils/sendmail");

const router = express.Router();

const checkEmail = (email) => {
  let emailReg = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
  return emailReg.test(email);
};

// const IsUserExist = async (email) => {
//   try {
//     const user = await User.findOne({ email });

//     if (user) {
//       return true;
//     } else {
//       return false;
//     }
//   } catch (err) {
//     return false;
//   }
// };

router.get("/", async (req, res) => {
  return res.status(200).send("hello");
});

router.post("/login", async (req, res) => {
  let { email, password } = req.query;

  let isEmail = checkEmail(email);

  if (!isEmail) {
    return res
      .status(500)
      .send({ message: "Please fill the correct Email", success: false });
  } else {
    try {
      let userExist = await User.findOne({ email, password });
      if (userExist) {
        return res.status(200).send({
          message: "You are login Succesfully",
          success: true,
          data: userExist,
        });
      } else {
        return res
          .status(404)
          .send({ message: "User not found", success: false });
      }
    } catch (err) {
      return res
        .status(404)
        .send({ message: "User not Found", success: false, err: err });
    }
  }
});

router.post("/register", async (req, res) => {
  const { email, password, name } = req.query;

  let isEmail = checkEmail(email);

  if (!isEmail) {
    return res
      .status(500)
      .send({ message: "Please fill the correct Email", success: false });
  } else {
    try {
      let userCreate = await User.create({ email, password, name });
      sendmail({
        from: "hello@arpit.com",
        to: email,
        subject: `Welcome to Note app- ${name}`,
        text: `Hi ${name}, Welcome to our system`,
      });
      return res.status(200).send({
        success: true,
        message: "user is signup succesfully",
        data: userCreate,
      });
    } catch (err) {
      res
        .status(404)
        .send({ success: false, message: "Error : User already exist" });
    }
  }
});

router.post("/forgetpassword", async (req, res) => {
  const { email } = req.query;

  let isEmail = checkEmail(email);
  if (!isEmail) {
    return res
      .status(500)
      .send({ message: "Please fill the correct Email", success: false });
  } else {
    try {
      const user = await User.findOne({ email });
      if (user) {
        sendmail({
          from: "hello@arpit.com",
          to: email,
          subject: `Forget Password on Note App- ${user.name}`,
          text: `Hi ${user.name}, Your Password is ${user.password}`,
        });
        return res.status(200).send({
          message: "Mail is sent Successfully, Check your Mail",
          success: true,
        });
      } else {
        return res
          .status(404)
          .send({ message: "User not found", success: false });
      }
    } catch (err) {
      return res
        .status(404)
        .send({ message: "User not found", success: false });
    }
  }
});

//export
module.exports = router;
