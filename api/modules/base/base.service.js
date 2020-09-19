class BaseService {
  constructor({ repositories }) {
    if (repositories) {
      Object.entries(repositories).forEach(([repositoryName, repository]) => {
        this[repositoryName] = repository;
      });
    }
  }
}

module.exports = BaseService;
