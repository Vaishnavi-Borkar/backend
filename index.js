const express = require("express");
const { connection } = require("./config/db");
const { userRoute } = require("./routes/userRoutes");
const { postRouter } = require("./routes/postRoutes");
const { authentification } = require("./middleware/authmiddle");

const cors = require("cors");
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("home");
});

app.use("/users", userRoute);
app.use(authentification);
app.use("/post", postRouter);
app.listen(process.env.port, async () => {
  try {
    await connection;
  } catch (err) {
    console.log("err");
  }
  console.log("server");
});
