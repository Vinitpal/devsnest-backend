const express = require("express");
const router = express.Router();
const registerInitialCheck = require("../middlewares/registerInitialCheck");
const register = require("../controllers/register");
const checkUserExists = require("../middlewares/checkUserExists");

router.post("/", registerInitialCheck, register);

module.exports = router;
