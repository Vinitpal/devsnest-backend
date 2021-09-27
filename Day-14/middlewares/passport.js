const User = require("../models/User");
const SECRET_KEY = process.env.SECRET_KEY;
const { Strategy, ExtractJwt } = require("passport-jwt");

const passport = () => {
  passport.use(
    new Strategy(opts, async (payload, done) => {
      await User.findById(payload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => {
          return done(null, false);
        });
    })
  );
};

module.exports = passport;
