const express = require("express");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const UserModal = require("../Modal/user.modal");
const { auth } = require("../middleware/auth");
const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const existingEmail = await UserModal.findOne({ email });
  if (existingEmail) {
    res.send("User Already Exist");
  } else {
    bcrypt.hash(password, 5, function (err, hash) {
      UserModal.insertMany({ name, email, password: hash });
    });
    res.send({ msg: "Signup Successfull" });
  }
});
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await UserModal.findOne({ email });
  console.log(hashedPassword._id);
  bcrypt.compare(password, hashedPassword.password, function (err, result) {
    if (result) {
      // let timestamp = new Date().getTime();
      var timestamp = new Date();
      timestamp.toLocaleString();
      var token = jwt.sign({ userID: hashedPassword._id }, "shhhhh");
      res.send({ msg: "Login Successful", token: token, time: timestamp });
    } else {
      res.send({ msg: "Login Failed" });
    }
  });
});

userRouter.get("/getprofile", auth, async (req, res) => {
  const token = req.headers.authorization;
  var decoded = jwt.verify(token, "shhhhh");
  const { userID } = decoded;
  const data = await UserModal.findOne({ _id: userID });
  res.send(data);
});
module.exports = userRouter;
