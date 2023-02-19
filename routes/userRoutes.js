const express = require("express");
require("dotenv").config();
const { userModel } = require("../modal/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRoute = express.Router();

userRoute.post("/register", async (req, res) => {
  const { email, pass } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, secure_pass) => {
      if (err) {
        console.log(err);
      } else {
        const user = new userModel({ email, pass: secure_pass });
        await user.save();
        res.send("register");
      }
    });
  } catch (err) {
    res.send(err);
  }
});

userRoute.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await userModel.find({ email });
    const hashpass = user[0].pass;
    if (user.length > 0) {
      bcrypt.compare(pass, hashpass, (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, process.env.key);
          res.send({ msg: "login", token: token });
        } else {
          res.send("error");
        }
      });
    } else {
      res.send("wrong");
    }
  } catch (err) {
    res.send(err);
  }
});

module.exports = {
  userRoute,
};
