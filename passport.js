const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;

const User = require('./models/User');

const ResponseData = require('./api/dtos/ResponseData');
const UnauthorizedError = require('./api/dtos/errors/UnauthorizedError');

const { STATUS_CODES } = require('./constants/api.constants');

const { jwt: { secretOrKey } } = require(`./config/${process.env.NODE_ENV || 'development'}`);

const cookieExtractor = (req) => {
  if (req && req.cookies) {
    return req.cookies.access_token;
  }

  return null;
};

passport.use(new JwtStrategy({
  jwtFromRequest: cookieExtractor,
  secretOrKey,
}, (payload, done) => {
  User.findById({ _id: payload.id }, (error, user) => {
    if (error) {
      return done(error, false);
    }

    if (user) {
      return done(null, user);
    }

    return done(null, false);
  });
}));

module.exports = {
  init: (app) => app.use(passport.initialize()),
  jwtAuthenticateMiddleware: (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (error, payload) => {
      if (payload && !error) {
        req.userId = payload.id;
        return next();
      }

      res.code = STATUS_CODES.UNAUTHORIZED;
      res.send(new ResponseData({ error: new UnauthorizedError() }));

      return null;
    })(req, res, next);
  },
};
