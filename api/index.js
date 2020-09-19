const userModule = require('./modules/user');
const authModule = require('./modules/auth');

class Api {
  constructor(app) {
    this.app = app;

    this.modules = [
      userModule,
      authModule,
    ];
  }

  init() {
    this.modules.forEach(({ controller }) => {
      if (controller) {
        const { routerPath, router } = controller;

        this.app.use(routerPath, router);
      }
    });
  }
}

module.exports = (app) => {
  const api = new Api(app);
  api.init();

  console.log('api initialization completed');
};
