const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

const usersRoutes = require("./routes/user-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json()); // "Content-Type" : "application/json"

app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("찾을 수 없는 경로입니다.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error); // 앱이 응답을 위해 HTTP 헤더를 보냈는지 여부를 나타내는 속성
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "알 수 없는 에러가 발생했습니다!" });
});

mongoose
  .connect(
    `mongodb+srv://seSoccer:${process.env.MONGODB_PASSWORD}@cluster0.zqwuieq.mongodb.net/sesoccer`
  )
  .then(() => app.listen(5000))
  .catch((err) => console.log(err));
