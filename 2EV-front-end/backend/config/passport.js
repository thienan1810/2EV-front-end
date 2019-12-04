const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const config = require("./keys");
const User = require('../models/User');

module.exports = function(passport) {
  const origin = {};
  origin.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  origin.secretOrKey = config.secret;
  passport.use(
    new JwtStrategy(origin, (jwt_payload, done) => {
      User.findById(jwt_payload.data._id, (err, user) => {
        if (err) {
          return done(err, false);
        }

        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );
};
