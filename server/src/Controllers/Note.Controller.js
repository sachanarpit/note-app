//import
const express = require("express");
const Notes = require("../Models/Notes.Model");
const Collabrater = require("../Models/Collabrater.Model");
const sendmail = require("../utils/sendmail");
const crypto = require("crypto");

const router = express.Router();

require("dotenv").config();
let FRONTEND = process.env.FRONTEND;

const checkEmail = (email) => {
  let emailReg = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
  return emailReg.test(email);
};

//create note
router.post("/create", async (req, res) => {
  let { email } = req.query;
  let isEmail = checkEmail(email);
  const uniqueId = crypto.randomBytes(16).toString("hex");

  let sendData = {
    uniqueId: uniqueId,
    createBy: email,
    isPublic: false,
    // note: `date ${new Date().getMilliseconds()}`,
    // title: `title ${new Date().getMilliseconds()}`,
    // tags: [{ tagName: "#hello", id: "999" }],
  };

  if (!isEmail) {
    return res
      .status(500)
      .send({ message: "Please fill the correct Email", success: false });
  } else {
    try {
      let dataSend = await Notes.create(sendData);
      return res.status(200).send({
        success: true,
        message: "note is created Successfully",
        data: dataSend,
      });
    } catch (err) {
      return res
        .status(404)
        .send({ message: "Note is not created", success: false, err: err });
    }
  }
});

//get note by the user email;

router.get("/getnote", async (req, res) => {
  let { email } = req.query;
  let isEmail = checkEmail(email);

  if (!isEmail) {
    return res
      .status(500)
      .send({ message: "Please fill the correct Email", success: false });
  } else {
    try {
      let allData = await Notes.find({ createBy: email });
      let finalArr = [];
      // allData.forEach(async (element) => {
      //   let data = await Collabrater.find({ noteId: element._id });
      //   let finalObj = { ...element, collabs: data };
      //   finalArr.push(finalObj);
      // });
      return res.status(200).send({
        success: true,
        message: "note is get succesfully",
        data: allData,
      });
    } catch (err) {
      return res.status(404).send({
        message: "There is a problem to fetch notes",
        success: false,
        err: err,
      });
    }
  }
});

router.get("/getsinglenote", async (req, res) => {
  let { noteid, email } = req.query;
  let isEmail = checkEmail(email);

  if (!isEmail) {
    return res
      .status(500)
      .send({ message: "Please fill the correct Email", success: false });
  } else {
    try {
      let allData = await Notes.findOne({ _id: noteid });
      let getAllCollb = await Collabrater.find({ noteId: noteid });
      return res.status(200).send({
        success: true,
        message: "note is get succesfully",
        data: allData,
      });
    } catch (err) {
      return res.status(404).send({
        message: "There is a problem to fetch notes",
        success: false,
        err: err,
      });
    }
  }
});
router.get("/getpublicnote", async (req, res) => {
  let { noteid } = req.query;

  try {
    let allData = await Notes.findOne({ _id: noteid });

    return res.status(200).send({
      success: true,
      message: "note is get succesfully",
      data: allData,
    });
  } catch (err) {
    return res.status(404).send({
      message: "There is a problem to fetch notes",
      success: false,
      err: err,
    });
  }
});

//update notes
router.patch("/updatenote", async (req, res) => {
  let { email, noteid, isPublic } = req.query;
  let { notes, title, tag = [] } = req.body;
  let isEmail = checkEmail(email);

  let updateData = {
    note: notes,
    title: title ? title : `Sample title${new Date().getMilliseconds}`,
    tags: tag,
    isPublic: isPublic ? true : false,
  };

  if (!isEmail) {
    return res
      .status(500)
      .send({ message: "Please fill the correct Email", success: false });
  } else {
    try {
      let allData = await Notes.findByIdAndUpdate(noteid, updateData);
      return res.status(200).send({
        success: true,
        message: "note is updated succesfully",
        data: allData,
      });
    } catch (err) {
      return res.status(404).send({
        message: "There is a problem to update notes",
        success: false,
        err: err,
      });
    }
  }
});

router.patch("/updateStatus", async (req, res) => {
  let { noteid, isPublic } = req.query;

  let updateData = {
    isPublic: isPublic,
  };

  try {
    let allData = await Notes.findByIdAndUpdate(noteid, updateData);
    return res.status(200).send({
      success: true,
      message: "note is updated succesfully",
      data: allData,
    });
  } catch (err) {
    return res.status(404).send({
      message: "There is a problem to update notes",
      success: false,
      err: err,
    });
  }
});

router.post("/invitemember", async (req, res) => {
  let { email, id, access } = req.query;

  let isEmail = true;

  let sendData = {
    noteId: id,
    userEmail: email,
    access: access,
  };

  if (!isEmail) {
    return res
      .status(500)
      .send({ message: "Please fill the correct Email", success: false });
  } else {
    try {
      let addData = await Collabrater.create(sendData);
      sendmail({
        from: "hello@arpit.com",
        to: email,
        subject: `You are invited on Note App- ${email}`,
        text: `Hi ,You are invite please <a href='${FRONTEND}/note/${id}'>Click here</a>`,
        // text: `Hi ,You are invite please <a href='fdsakf/note/${id}'>Click here</a>`,
      });
      return res.status(200).send({
        success: true,
        message: "invite the member succesfully",
        data: addData,
      });
    } catch (err) {
      return res
        .status(404)
        .send({ message: "Note is not created", success: false, err: err });
    }
  }
});

//export
module.exports = router;
