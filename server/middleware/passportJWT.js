const passport = require('passport');
const passportJWT = require('passport-jwt');
const User = require('../models/user');
const config = require('../config');

const { Strategy } = passportJWT;
const { ExtractJwt } = passportJWT;

const objValue = {
  secretOrKey: config.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

module.exports = () => {
  const strategy = new Strategy(objValue, async (payload, done) => {
    const user = await User.findById(payload.id);
    if (!user) {
      return done(new Error('User not found'));
    }
    return done(null, user);
  });

  passport.use(strategy);

  return {
    initialize() {
      return passport.initialize();
    },
    authenticate() {
      return passport.authenticate('jwt', {
        session: false,
      });
    },
  };
};
