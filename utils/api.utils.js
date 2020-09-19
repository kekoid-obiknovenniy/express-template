const ResponseData = require('../api/structures/ResponseData');

const { STATUS_CODES } = require('../constants/api.constants');

module.exports = {
  transformRequest(handler, validators = []) {
    return (req, res) => {
      const { params, body, userId } = req;

      try {
        validators.forEach((validator) => validator({ body, params }));
      } catch (error) {
        res.status(STATUS_CODES.BAD_REQUEST);
        res.send(new ResponseData({ error }));
        return;
      }

      handler({
        params,
        body,
        userId,
        req,
        res,
      }).then((result) => {
        res.send(new ResponseData({ result }));
      }).catch((error) => {
        res.status(error.statusCode || 500);
        res.send(new ResponseData({ error }));
      });
    };
  },
};
