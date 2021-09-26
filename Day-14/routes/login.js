const express = require("express");
const router = express.Router();

// middlewares and controllers
const checkUserExists = require("../middlewares/checkUserExists");
const login = require("../controllers/login");

router.post("/", checkUserExists, login);

module.exports = router;
