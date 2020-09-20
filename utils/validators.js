const mongoose = require('mongoose');

const BadRequestError = require('../api/dtos/errors/BadRequestError');
const { INVALID_PARAM } = require('../constants/errors');

module.exports = {
  validateSchema: (schema, data) => {
    const { error } = schema.validate(data);

    if (error) {
      const { details: [{ message, path }] } = error;

      throw new BadRequestError({ path, message });
    }

    return true;
  },
  validateId: ({ params }) => {
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError({ path: ['/:id'], message: INVALID_PARAM });
    }

    return true;
  },
};
