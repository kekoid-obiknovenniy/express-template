const jwt = require('jsonwebtoken');

const { jwt: { secretOrKey, expiresIn } } = require(`../config/${process.env.NODE_ENV || 'development'}`);

module.exports = {
  signToken: (payload) => jwt.sign(payload, secretOrKey, { expiresIn }),
};
