const Joi = require('joi');

const { validateSchema } = require('../../../utils/validators');

const {
  MIN_USERNAME_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
} = require('../../../constants/modules/user.constants');

const username = Joi.string()
  .min(MIN_USERNAME_LENGTH)
  .max(MAX_USERNAME_LENGTH);

const password = Joi.string()
  .min(MIN_PASSWORD_LENGTH)
  .max(MAX_PASSWORD_LENGTH);

const userSchema = Joi.object({
  username: username.required(),
  password: password.required(),
});

module.exports = {
  validateUser: ({ body }) => validateSchema(userSchema, body),
};
