const User = require("../models/User");
const bcrypt = require("bcrypt");

const saltRounds = 10;

const register = async (req, res) => {
  const { name, role, email, password } = req.body;
  try {
    const alreadyExists = await User.findOne({ email });
    if (alreadyExists) {
      res.status(401).send({ message: "User already Exists" });
    }

    const salt = bcrypt.genSaltSync(saltRounds);
    const passwordHash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      name: name,
      role: role,
      email: email.toLowerCase(),
      password: passwordHash,
    });

    const savedUser = await newUser.save();
    res.status(200).send({ message: "User registered successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "something went wrong, cant register" });
  }
};
