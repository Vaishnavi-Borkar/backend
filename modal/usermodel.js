const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: { type: String, required: true },
  pass: { type: String, required: true },
});

const userModel = mongoose.model("authuser", userSchema);

module.exports = {
  userModel,
};
