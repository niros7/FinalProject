let request = require('request');
const NerServiceUrl = require('../settings.js').NerServiceUrl
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


function extractLocationsFromTrips() {
  const nerServiceUrl = NerServiceUrl + "extract-entities"
  legendaryTripModel.find((err, trips) => {

    for (var i = 0, len = trips.length; i < len; i++) {
      let trip = trip[i]

      request({
        url: nerServiceUrl,
        method: "POST",
        json: trips[i].Steps
      }, (err, res) => {
        tagsForEachStep = res.body

        for (let j = 0; j < tagForEachStep.length; j++) {
          const tagsForStep = tagsForEachStep[j].filter((value, index, self) => {
            return tagsForEachStep[j].indexOf(value) === index;
          })

          trip.Steps[j].Locations = tagsForStep

        }
      })
    }
  })
}


module.exports = {
  saveTrips,
  extractLocationsFromTrips
};