const BaseService = require('../base/base.service');

const BadRequestError = require('../../structures/errors/BadRequestError');

class UserService extends BaseService {
  async createUser(data) {
    const { username } = data;

    const user = await this.userRepository.findByUsername(username);

    if (user) {
      throw new BadRequestError({ path: ['username'], message: 'Username is already taken' });
    }

    return this.userRepository.create(data);
  }

  async findByUsername(username) {
    return this.userRepository.findByUsername(username);
  }
}

module.exports = UserService;
