const UserRepository = require('./user.repository');

const UserServices = require('./user.service');

const User = require('../../../models/User');

class UserModule {
  constructor() {
    const userRepository = new UserRepository(User);

    const userService = new UserServices({ repositories: { userRepository } });

    this.repositories = {
      userRepository,
    };

    this.services = {
      userService,
    };
  }
}

module.exports = new UserModule();
