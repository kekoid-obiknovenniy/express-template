const express = require('express');

const { transformRequest } = require('../../../utils/decorators');
const { jwtAuthenticateMiddleware } = require('../../../passport');

class BaseController {
  constructor({ services, routerPath }) {
    this.router = express.Router();
    this.routerPath = routerPath;

    if (services) {
      Object.entries(services).forEach(([serviceName, service]) => {
        this[serviceName] = service;
      });
    }
  }

  init() {
    this.routes.forEach(({
      method,
      path,
      handler,
      isAuthenticationNeed,
      validators,
    }) => this.router[method](
      path,
      ...isAuthenticationNeed ? [jwtAuthenticateMiddleware] : [],
      transformRequest(handler, validators),
    ));

    return this;
  }
}

module.exports = BaseController;
