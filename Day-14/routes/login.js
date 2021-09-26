const express = require("express");
const router = express.Router();
const login = require("../controllers/login");
const checkUserExists = require("../middlewares/checkUserExists");

router.post("/", checkUserExists, login);

module.exports = router;
