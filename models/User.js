const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const {
  MIN_USERNAME_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
} = require('../constants/modules/user.constants');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: MIN_USERNAME_LENGTH,
    maxlength: MAX_USERNAME_LENGTH,
    required: true,
  },
  password: {
    type: String,
    minlength: MIN_PASSWORD_LENGTH,
    maxlength: MAX_PASSWORD_LENGTH,
    required: true,
  },
});

function generatePasswordHash(next) {
  if (!this.isModified('password')) {
    return next();
  }

  return bcrypt.hash(this.password, 10, (error, passwordHash) => {
    if (error) {
      return next(error);
    }

    this.password = passwordHash;

    return next();
  });
}

function comparePassword(password) {
  return bcrypt.compare(password, this.password);
}

UserSchema.pre('save', generatePasswordHash);
UserSchema.methods.comparePassword = comparePassword;

module.exports = mongoose.model('User', UserSchema);
