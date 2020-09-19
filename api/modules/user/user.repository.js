const BaseRepository = require('../base/base.repository');

class UserRepository extends BaseRepository {
  async findByUsername(username) {
    return this.Model.findOne({ username });
  }
}

module.exports = UserRepository;
