let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// create a schema
let legendaryTripSchema = new Schema({
  Link: String,
  Title: String,
  SubTitle: String,
  Destinations: [String],
  Duration: String,
  Themes: [String],
  Steps: [{ Title: String, Content: String }]
});

let legendaryTripModel = mongoose.model('LegendaryTrip', legendaryTripSchema);

module.exports = legendaryTripModel;
