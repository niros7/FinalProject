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
var tripModel = require('mongoose').model('Trip');

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


  // Link: String,
  //  Title: String,
  //  SubTitle: String,
  //  Destinations: [String],
  //  Duration: String,
  //  Themes: [String],
  //  Steps: [{ Title: String, Content: String }]

var getTrips = function(req, res) {
  var filter = {};
  debugger;
  if ((req.body.location!=null && req.body.location!='') && req.body.amount!=null && req.body.tags.length > 0) {
    parseAmount(filter, req.body);
    tripModel.find({}).where('Locations').in([req.body.location]).where('Duration').gt(filter.amount-filter.range).
    lt(filter.amount+filter.range).where('Tags').in(req.body.tags)
    .exec(function(err, trips) { tripCallBack(err, trips, res);});

  } else if ((req.body.location!=null && req.body.location!='') && req.body.tags.length > 0) {
    tripModel.find({}).where('Locations').in([req.body.location]).where('Tags').in(req.body.tags)
    .exec(function(err, trips) { tripCallBack(err, trips, res);});

  } else if ((req.body.location!=null && req.body.location!='') && req.body.amount!=null) {
    parseAmount(filter, req.body);
    tripModel.find({}).where('Locations').in([req.body.location]).where('Duration').gt(filter.amount-filter.range).
                       lt(filter.amount+filter.range).exec(function(err, trips) { tripCallBack(err, trips, res);});

  } else if (req.body.tags.length > 0 && req.body.amount!=null) {
    parseAmount(filter, req.body);
    tripModel.find({}).where('Duration').gt(filter.amount-filter.range).
    lt(filter.amount+filter.range).where('Tags').in(req.body.tags)
    .exec(function(err, trips) { tripCallBack(err, trips, res);});

  } else if (req.body.location!=null && req.body.location!='') {
    tripModel.find({}).where('Locations').in([req.body.location]).exec(function(err, trips) { tripCallBack(err, trips, res);});

  } else if (req.body.amount!=null) {
    parseAmount(filter, req.body);
    tripModel.find({}).where('Duration').gt(filter.amount-filter.range).
                       lt(filter.amount+filter.range).exec(function(err, trips) { tripCallBack(err, trips, res);});

  } else if (req.body.tags.length > 0) {
    tripModel.find({}).where('Tags').in(req.body.tags).exec(function(err, trips) { tripCallBack(err, trips, res);});

  } else {
    res.json();
  }



  
  /*if (req.body.location!=null) {
    filter.location = req.body.location;
  }

  if (req.body.amount!=null) {
    filter.amount = parseInt(req.body.amount);

    if (req.body.range!=null) {
      filter.range =  parseInt(req.body.range);
    } else {
      filter.range = 0;
    }
    debugger;
    tripModel.find({}).where('Locations').in([filter.location])
    .where('Duration').gt(filter.amount-filter.range).lt(filter.amount+filter.range).exec(function(err, trips) {
      if (err) {
        console.error(err);
        res.statusCode = 500;
        return res.json({ errors: ['Could not get trips'] });
      } else {
        res.json(trips);
      }
      debugger;
    });
  }
  debugger;*/

  /*tripModel.find({}).where('Duration').gt().lt().exec();
  tripModel.find(filter, function(err, trips) {
    if (err) {
      console.error(err);
      res.statusCode = 500;
      return res.json({ errors: ['Could not get trips'] });
    } else {
      res.json(trips);
    }
  });*/


  /*if (req.body.location != null) {

  }*/
 // For now, we select x trips whithout the 'where' cluase
 /*let query = tripModel.find({}).limit(5);
 query.exec(function(err,data){
    res.json(data);
 });*/
};

function parseAmount(filter, body) {
  filter.amount = parseInt(body.amount);

  if (body.range!=null) {
    filter.range =  parseInt(body.range);
  } else {
    filter.range = 0;
  }
}

function tripCallBack(err, trips, res) {
  if (err) {
    console.error(err);
    res.statusCode = 500;
    return res.json({ errors: ['Could not get trips'] });
  } else {
    res.json(trips);
  }
}

function getTripItinerary(req, res) {
  console.log(req.params);
  console.log(req.params.id);
  
  let query = tripModel.findById(req.params.id);
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
  let query = tripModel.findById(req.params.id);
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

/*function getLocations(req, res) {
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
};*/

function getLocations(req, res) {
  var query = tripModel.aggregate([{$unwind:"$Locations"},{$group:{_id:"$Locations"}},{$project:{_id:0,Location:"$_id"}}]);
    query.exec(function(err,data){
      res.json(data);
  });
};

function getAllThemes(req, res){
  var query = tripModel.aggregate([
     { $project: { items: { $concatArrays: [ "$Tags" ] } } },
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