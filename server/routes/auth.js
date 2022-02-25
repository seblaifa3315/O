const express = require("express");
const router = express.Router();
const { validateRegister } = require("../utils/validate");

const { registerUser } = require("../controllers/auth");

router.route("/register").post(validateRegister, registerUser);

module.exports = router;