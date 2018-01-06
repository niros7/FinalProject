let legendaryTripModel = require('../models/legendaryTripModel.js');

function saveTrips(trips, callback) {
  callback();
  return;
  let allTrips = []
  let error;
  for (let i = 0; i < trips.length; i++) {

    let currentTrip = new legendaryTripModel(trips[i]);
    allTrips.push(currentTrip);
  }

  legendaryTripModel.collection.insert(allTrips, onInsert);

  function onInsert(err, docs) {
    if (err) {
      // TODO: find out how to return http 500 error
    } else {
      console.info('%d trips were successfully stored.', docs.length);
    }
  }
}


module.exports = { saveTrips };
