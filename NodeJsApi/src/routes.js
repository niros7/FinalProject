let legendaryTripsController = require('./controllers/legenderyTripsController.js');

function registerRoutes(app) {
  app.use('/legendery', legendaryTripsController);
}

module.exports = registerRoutes;
