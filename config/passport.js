// This is the JWT Token Strat from Passport itself, this is how Passport likes to Organize it's methods
const JwtStrategy = require("passport-jwt").Strategy;
// When then need to extract the JWT token given to us as an arguement from the front end
const ExtractJwt = require("passport-jwt").ExtractJwt;
// bring ing Mongo ORM
const mongoose = require("mongoose");
// Bring in the right Schema that we are going to use to check against the token that will be sent to this method as an arguement
const db = require("../models/index");
// Bring in the secret that the strategy needs in order to work, But I dont know why it is just secret in that file, that is still a mystery to me
const keys = require("../config/keys");

// opts = short for Options and insert the ness
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

// export the result
module.exports = (passport) => {
  // passport creates a new JWTStrat constructor with the options(opts) variable from earlier
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      // After doing it's thing, it goes into the DB and trys to find the user by the name given after being decoded
      db.User.findById(jwt_payload.id)
        //   if true, allow the process to go through, if not, cancel
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => console.log(err));
    })
  );
};
