const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const User = require("../models/user");

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req); // 유입데이터 체크를 통과하면서 생긴 에러메시지를 받을 수 있다.
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("잘못된 입력입니다. 데이터를 확인해주세요.", 422)
    );
  }
  const { nickName, email, password, checkPassword } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "회원가입에 실패하셨습니다. 다시 시도해주세요.",
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError("이미 등록된 사용자입니다.", 422);
    return next(error);
  }

  if (password !== checkPassword) {
    const error = new HttpError(
      "비밀번호가 같지 않습니다. 다시 입력해주세요.",
      422
    );
    return next(error);
  }

  const createdUser = new User({
    nickName,
    email,
    password,
    checkPassword,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("회원가입에 실패하셨습니다.", 500);
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getteers: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    const error = new HttpError(
      "로그인에 실패했습니다. 다시 시도해주세요.",
      500
    );
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError(
      "등록되지 않은 사용자입니다. 다시 시도해주세요.",
      401
    );
    return next(error);
  }

  res.json({ message: "로그인에 성공했습니다." });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
