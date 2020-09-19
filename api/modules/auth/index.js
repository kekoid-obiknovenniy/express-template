const AuthController = require('./auth.controller');

const { services: { userService } } = require('../user');

class AuthModule {
  constructor() {
    const authController = new AuthController({ services: { userService }, routerPath: '/auth' });

    this.controller = authController.init();
  }
}

module.exports = new AuthModule();
