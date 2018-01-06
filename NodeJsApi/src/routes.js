let legendaryTripsController = require('./controllers/legenderyTripsController.js');

function registerRoutes(app) {
  console.log('registering routes');
  app.use('/legendery', legendaryTripsController);
}

module.exports = registerRoutes;
