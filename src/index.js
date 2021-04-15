const Hapi = require('@hapi/hapi');
const Joi = require('joi');
const bookRoutes = require('./api/routes/books');

const init = async function init() {
  const server = Hapi.server({
    host: '0.0.0.0',
    port: 5000,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.validator(Joi);
  server.route(bookRoutes);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

init();

process.on('unhandledRejection', (reason, promise) => {
  console.log(`Unhandled Rejection at: ${promise} reason: ${reason}`);
  process.exit(1);
});

process.on('uncaughtExceptionMonitor', (err, origin) => {
  console.log(err);
  console.log(origin);
});

process.on('uncaughtException', (err, origin) => {
  console.log(err);
  console.log(origin);
});
