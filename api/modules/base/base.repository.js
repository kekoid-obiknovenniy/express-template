class BaseRepository {
  constructor(model) {
    this.Model = model;
  }

  async findAll() {
    return this.Model.find();
  }

  async findById(id) {
    return this.Model.findById(id);
  }

  async create(data) {
    const modelInstance = new this.Model(data);
    return modelInstance.save();
  }

  async deleteById(id) {
    return this.Model.deleteOne({ _id: id });
  }
}

module.exports = BaseRepository;
