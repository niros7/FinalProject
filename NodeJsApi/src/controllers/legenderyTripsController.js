let express = require('express');
let router = express.Router();
let legendaryManager = require("../managers/legendaryTripsManager.js");


router.get('/', function (req, res) {
  legendaryManager.saveTrips(null, err => console.log("error"));
  console.log("done!");
})

router.get('/Trips', function (req, res) {
  console.log("Got a POST request for the homepage");
  legendaryManager.getTrips(req, function(data, err) {
    if (err==null) {
      res.send(data);
    } else {
      res.send('Error');
    }
  })
})

module.exports = router;
