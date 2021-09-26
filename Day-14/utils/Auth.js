const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/user");
const { SECRET } = require("../config");

// register the (user, admin, superAdmin)
const userRegister = async (userDets, role, res) => {
  try {
    // validate username
    let usernameNotTaken = await validateUsername(userDets.username);

    if (!usernameNotTaken) {
      return res.status(400).json({
        message: "Username is already taken",
        success: false,
      });
    }
    // validate email
    let emailNotTaken = await validateEmail(userDets.email);

    if (!emailNotTaken) {
      return res.status(400).json({
        message: "Email is already taken",
        success: false,
      });
    }

    // get hashed passowrd
    const password = await bcrypt.hash(userDets.password, 12);

    // create new user
    const newUser = new User({
      ...userDets,
      password,
      role,
    });

    console.log("working?");
    // save user
    await newUser.save();
    return res.status(201).json({
      message: "User created successfully",
      success: true,
      user: newUser,
    });
  } catch (err) {
    console.error(err.message);
  }
};

// login the (user, admin, superAdmin)

const userLogin = async (userCreds, role, res) => {
  let { username, password } = userCreds;

  // check if username is in database
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({
      message: "Username is not found.",
      success: false,
    });
  }

  // check role
  if (user.role != role) {
    return res.status(403).json({
      message: "please make sure you're logging in right portal",
      success: false,
    });
  }

  // check password
  let isMatch = await bcypt.compare(password, user.password);
  if (isMatch) {
    // sign in the token and issue it
    let token = jwt.sign(
      {
        user_id: user.id,
        role: user.role,
        username: user.username,
        email: user.email,
      },
      SECRET,
      { expiresIn: "7 days" }
    );

    let result = {
      username: user.username,
      role: user.role,
      email: user.email,
      token: token,
      expiresIn: 168,
    };

    return res.status(200).json({
      ...result,
      message: "Logged IN successfully",
      success: true,
    });
  } else {
    return res.status(403).json({
      message: "Incorrect password",
      success: false,
    });
  }
};

const validateUsername = async (username) => {
  let user = await User.findOne({ username });
  return user ? false : true;
};

// const validateEmail = async (email) => {
//   let checkEmail = await User.findOne({ email });
//   return checkEmail ? false : true;
// };

const validateEmail = async (email) => {
  // let user = await User.findAll({ where: { email: email } });
  // return user ? false : true;
  return true;
};

const userAuth = passport.authenticate("jwt", { session: false });

const checkRole = (roles) => (req, res, next) => {
  !roles.includes(req.user.role)
    ? res.status(401).json("Unauthorized")
    : next();
};

const serializeUser = (user) => {
  return {
    username: user.username,
    email: user.email,
    name: user.name,
    _id: user._id,
    updatedAt: user.updatedAt,
    createdAt: user.createdAt,
  };
};

module.exports = {
  userAuth,
  checkRole,
  userLogin,
  userRegister,
  serializeUser,
};
