const express = require("express");
const router = express.Router();
const { validateRegister, validateLogin } = require("../utils/validate");
const protect = require("../middleware/auth");
const { registerUser, loginUser, loadUser, logoutUser, deleteUserDiverProfile } = require("../controllers/auth");

router.route("/register").post(validateRegister, registerUser);
router.route("/login").post(validateLogin, loginUser);
router.route("/user").get(protect, loadUser);
router.route("/logout").post(logoutUser);
router.route("/delete").delete(deleteUserDiverProfile);

module.exports = router;