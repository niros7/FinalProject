let express = require('express');
let router = express.Router();
let legendaryManager = require("../managers/legendaryTripsManager.js");


router.get('/', function (req, res) {
  res.send('Hello World!')
})

router.get('/extract', function (req, res) {
  legendaryManager.extractLocationsFromTrips(null, err => console.log("error"));
  console.log("done!");
})

module.exports = router;