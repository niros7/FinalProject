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
  legendaryTripModel.find({}, (err, trips) => {
    tipsAndTags = {
      trip: undefined,
      tags: undefined
    }

    trips.forEach(trip => {
      request({
        url: nerServiceUrl,
        method: "POST",
        json: trip.Steps
      }, (err, res) => {
        tagsForEachStep = res.body

        for (let j = 0; j < tagsForEachStep.length; j++) {
          const tagsForStep = tagsForEachStep[j];

          if (trip.Steps[j] && tagsForStep.length > 0) {
            tagsForStep.forEach(tag => {
              trip.Steps[j].Locations.push(tag)
            });
          }
        }

        let documentId = {
          "_id": trip._id
        }

        legendaryTripModel.findByIdAndUpdate(documentId, trip, {
          new: true
        }, function (err, model) {
          console.log(err);
          console.log(model.Steps.map(x => x.Locations));
        })

      })
    })
  })
}


module.exports = {
  saveTrips,
  extractLocationsFromTrips
};