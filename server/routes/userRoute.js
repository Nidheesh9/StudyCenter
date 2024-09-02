const express = require("express");
const { changePassword, sendOTP, signUp, logIn } = require("../controllers/AuthController");
const { resetPasswordToken, resetPassword } = require("../controllers/ResetPassword");
const {auth} = require("../middlewares/auth");
const router = express.Router();

router.post("/signup",signUp);
router.post("/sendOTP",sendOTP);
router.post("/login",logIn);
router.post("/changepassword",auth,changePassword);

router.post("/reset-password-token",resetPasswordToken);
router.post("/reset-password",resetPassword);

module.exports = router;