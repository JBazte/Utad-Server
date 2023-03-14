const express = require("express");
const { validatorRegister, validatorLogin } = require("../validators/auth.js");
const { registerCtrl, loginCtrl } = require("../controllers/auth.js");
const router = express.Router();

router.post("/register", validatorRegister, registerCtrl);
router.post("/login", validatorLogin, loginCtrl);

module.exports = router