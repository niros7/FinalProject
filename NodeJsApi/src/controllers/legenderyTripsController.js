let express = require('express');
let router = express.Router();
let legendaryManager = require("../managers/legendaryTripsManager.js");


router.get('/', function (req, res) {
  legendaryManager.saveTrips(null, err => console.log("error"));
  console.log("done!");
})

module.exports = router;
