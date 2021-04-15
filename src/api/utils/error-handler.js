const Boom = require('@hapi/boom');

const errorHandler = function handler(message, code) {
  let error = null;
  const status = 'fail';
  const payload = {
    status,
    message,
  };

  switch (code) {
    case 400:
      error = Boom.badRequest();
      break;
    case 404:
      error = Boom.notFound();
      break;
    default:
      error = Boom.badImplementation();
  }

  error.output.payload = payload;

  return error;
};

module.exports = errorHandler;
