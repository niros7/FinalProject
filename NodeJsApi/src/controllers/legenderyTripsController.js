let express = require('express');
let router = express.Router();
let legendaryManager = require("../managers/legendaryTripsManager.js");


router.get('/', function (req, res) {
  legendaryManager.saveTrips(null, err => console.log("error"));
  console.log("done!");
})

router.get('/trips', function (req, res) {
  console.log("Got a POST request for the homepage");
  legendaryManager.getTrips(req, function(data, err) {
    if (err==null) {
      res.send(data);
    } else {
      res.send('Error');
    }
  })
})

router.get('/Locations', function (req,res){
  legendaryManager.getAllLocations(req, function(data, err)  {
    if (err==null) {
      res.send(data);
    } else {
      res.send('Error');
    }
  })
})

router.get('/trips/:id', (req, res) => {
  legendaryManager.getTripItinerary(req.params.id, (data) => {
    console.log(data);
    res.send(data)
  })
})

module.exports = router;
