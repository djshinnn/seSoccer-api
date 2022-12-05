const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  nickName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  checkPassword: { type: String, required: true, minlength: 8 },
});

userSchema.plugin(uniqueValidator); // 사용자를 저장하려고 하면 중복 데이터베이스 항목을 확인하고 오류 보고

module.exports = mongoose.model("User", userSchema);
