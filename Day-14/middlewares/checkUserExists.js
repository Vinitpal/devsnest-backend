const User = require("../models/User");

const checkUserExists = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  next();
};

module.exports = checkUserExists;
