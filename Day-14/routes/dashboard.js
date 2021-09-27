const express = require("express");
const router = express.Router();

// middlewares and controllers

router.get("/", userAuth, (req, res) => {
  res.status(200).json({ message: "Welcome to dashboard" });
});
