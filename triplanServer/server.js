'use strict';

//mongoose file must be loaded before all other files in order to provide
// models to other modules
var mongoose = require('./mongoose'),
  passport = require('passport'),
  express = require('express'),
  jwt = require('jsonwebtoken'),
  expressJwt = require('express-jwt'),
  router = express.Router(),
  cors = require('cors'),
  bodyParser = require('body-parser');

mongoose();

var User = require('mongoose').model('User');
var legendaryTripModel = require('mongoose').model('LegendaryTrip');

var passportConfig = require('./passport');

//setup configuration for facebook login
passportConfig();

var app = express();

// enable cors
var corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));

//rest API requirements
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

router.route('/health-check').get(function(req, res) {
  res.status(200);
  res.send('Hello World');
});

var createToken = function(auth) {
  return jwt.sign({
    id: auth.id
  }, 'my-secret',
  {
    expiresIn: 60 * 120
  });
};

var generateToken = function (req, res, next) {
  req.token = createToken(req.auth);
  next();
};

var sendToken = function (req, res) {
  res.setHeader('x-auth-token', req.token);
  res.status(200).send(req.auth);
};

router.route('/auth/facebook')
  .post(passport.authenticate('facebook-token', {session: false}), function(req, res, next) {
    if (!req.user) {
      return res.send(401, 'User Not Authenticated');
    }

    // prepare token for API
    req.auth = {
      id: req.user.id
    };

    next();
  }, generateToken, sendToken);

//token handling middleware
var authenticate = expressJwt({
  secret: 'my-secret',
  requestProperty: 'auth',
  getToken: function(req) {
    console.log(req.headers['x-auth-token']);
    if (req.headers['x-auth-token']) {
      return req.headers['x-auth-token'];
    }
    return null;
  }
});

var getCurrentUser = function(req, res, next) {
  User.findById(req.auth.id, function(err, user) {
    if (err) {
      next(err);
    } else {
      req.user = user;
      next();
    }
  });
};

var getOne = function (req, res) {
  var user = req.user.toObject();

  delete user['facebookProvider'];
  delete user['__v'];

  res.json(user);
};

router.route('/auth/me')
  .get(authenticate, getCurrentUser, getOne);


var getTrips = function(req, res) {
  console.log(req.body);
 // For now, we select x trips whithout the 'where' cluase
 let query = legendaryTripModel.find({}).limit(5);
 query.exec(function(err,data){
    res.json(data);
 });
};

function getTripItinerary(req, res) {
  console.log(req.params);
  console.log(req.params.id);
  
  let query = legendaryTripModel.findById(req.params.id);
  query.exec(function(err,data){
    if(!data) {
      return undefined
    } else {
      let result = {
        "_id": data._id,
        "locations": data.Destinations
      }

      res.json(result);
    }
 });
};

function getTripData(req, res) {
  console.log(req.params);
  let query = legendaryTripModel.findById(req.params.id);
  query.exec(function(err,data){
    if(!data) {
      console.log("error");
      return undefined
    } else {
      console.log(data);
      res.json(data);
    }
 });
};

function getLocations(req, res) {
  var query = legendaryTripModel.aggregate([{$unwind:"$Steps"},
    {$project :{_id:1, Steps:{Locations:{Text:1}}, Destinations:1}},
      { $project: { Locations: { $concatArrays: [ "$Steps.Locations.Text", "$Destinations" ] } } },
      {$unwind:"$Locations"},
      {$group:{_id: "$Locations"}},
      {$project:{_id:0,Location: "$_id"}}
    ]);
    query.exec(function(err,data){
      res.json(data);
  });
};

function getAllThemes(req, res){
  var query = legendaryTripModel.aggregate([
     { $project: { items: { $concatArrays: [ "$Themes" ] } } },
     {$unwind:"$items"},
     {$group:{_id: "$items"}},
     {$project:{_id:0,item: "$_id"}}
  ]);

   query.exec(function(err,data){
     if (err != null) { callback (err);}
     console.log(data);
     res.json(data);
 });
 };

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
};

router.route('/trips/:id')
  .get(authenticate, getTripItinerary);

  router.route('/trip/:id')
  .get(authenticate, getTripData);

router.route('/Trips')
  .post(authenticate, getTrips);

router.route('/Locations')
  .get(authenticate, getLocations);

router.route('/Themes')
  .get(authenticate, getAllThemes);


app.use('/api/v1', router);

app.listen(3000);
module.exports = app;

console.log('Server running at http://localhost:3000/');