// const User = require("../models/User");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
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
