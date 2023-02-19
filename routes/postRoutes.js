const express = require("express");
const { postModel } = require("../modal/postmodel");
const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
  try {
    const data = await postModel.find();
    res.send(data);
  } catch (err) {
    res.send("err");
  }
});

postRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const newdata = new postModel(payload);
    await newdata.save();
    res.send("done");
  } catch (err) {
    res.send("err");
  }
});

postRouter.patch("/update/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  const data = await postModel.findOne({ _id: id });
  const userIdpost = data.userID;
  const userIdreq = req.body.userID;

  try {
    if (userIdreq !== userIdpost) {
      res.send("not authorized");
    } else {
      await postModel.findByIdAndUpdate({ _id: id }, payload);
      res.send("uodate");
    }
  } catch (err) {
    res.send("wrong");
  }
});

postRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const data = await postModel.findOne({ _id: id });
  const userIdpost = data.userID;
  const userIdreq = req.body.userID;

  try {
    if (userIdreq !== userIdpost) {
      res.send("not authorized");
    } else {
      await postModel.findByIdAndDelete({ _id: id });
      res.send("uodate");
    }
  } catch (err) {
    res.send("wrong");
  }
});

module.exports = { postRouter };
