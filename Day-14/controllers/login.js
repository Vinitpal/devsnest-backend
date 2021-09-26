const User = require("../models/User");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  const token = jwt.sign(
    { userId: user[0].id, email: email },
    process.env.SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );

  return res.status(200).send({ token, user });
};

module.exports = login;
