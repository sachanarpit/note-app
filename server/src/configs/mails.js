const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  // host: "smtp.mailtrap.io",
  // port: 2525,
  // secure: false,
  // auth: {
  //   user: "62239d9bfe6200",
  //   pass: "67bf7ea9904c58",
  // },

  host: "smtp-relay.sendinblue.com",
  port: 587,
  secure: false,
  auth: {
    user: "sachanarpitknp@gmail.com",
    pass: "QNxpg8KZwA16MnDt",
  },
});

transporter.verify((e) => {
  if (e) {
    return console.error(e);
  }
});

module.exports = transporter;
