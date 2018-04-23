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

/**
 * Get trips from the db according to the parameters
 */
function getTrips(params, callback) {
  // For now, we select x trips whithout the 'where' cluase
  let query = legendaryTripModel.find({}).limit(5);
  query.exec(function(err,data){
      callback(data);
  });

  return;
}


function getTripItinerary(id, cb) {
  let query = legendaryTripModel.findById(id, (err, data) => {
    if(!data) {
      return undefined
    } else {
      let result = {
        "_id": data._id,
        "locations": data.Destinations
      }

      cb(result)
    }
  })
}

module.exports = { saveTrips, getTrips, getTripItinerary };
