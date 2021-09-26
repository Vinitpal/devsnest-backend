const express = require("express");
const router = express.Router();

// middlewares and controllers
const registerInitialCheck = require("../middlewares/registerInitialCheck");
const register = require("../controllers/register");

router.post("/", registerInitialCheck, register);

module.exports = router;
