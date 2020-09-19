const BaseController = require('../base/base.controller');
const UnauthorizedError = require('../../structures/errors/UnauthorizedError');

const { signToken } = require('../../../utils/jwt.utils');

const { API_METHODS } = require('../../../constants/api.constants');

class AuthController extends BaseController {
  constructor(params) {
    super(params);

    this.routes = [
      { method: API_METHODS.POST, path: '/register', handler: this.register.bind(this) },
      { method: API_METHODS.POST, path: '/login', handler: this.login.bind(this) },
    ];
  }

  async register({ body }) {
    return this.userService.createUser(body);
  }

  async login({ body, res }) {
    const { username, password } = body;

    const user = await this.userService.findByUsername(username);

    if (!user) {
      throw new UnauthorizedError();
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      throw new UnauthorizedError();
    }

    const token = signToken({ id: user._id });
    res.cookie('access_token', token, { httpOnly: true, sameSite: true });

    return true;
  }
}

module.exports = AuthController;
