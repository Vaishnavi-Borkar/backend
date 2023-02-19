const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  des: { type: String, required: true },
  userID: { type: String, required: true },
});

const postModel = mongoose.model("authpost", postSchema);

module.exports = {
  postModel,
};
