const express = require("express");
const { check } = require("express-validator");

const usersController = require("../controllers/users-controllers");

const router = express.Router();

router.get("/", usersController.getUsers);

router.post(
  "/signup",
  [
    check("nickName").not().isEmpty(),
    check("email").normalizeEmail().isEmail(), // Test@test.com => test@test.com
    check("password").isLength({ min: 8 }),
    check("checkPassword").isLength({ min: 8 }),
  ],
  usersController.signup
);

router.post("/login", usersController.login);

module.exports = router;
