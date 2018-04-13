let mongoose = require('mongoose')
let mongoDB = 'mongodb://admin:1234@ds239117.mlab.com:39117/colman';

mongoose.Promise = require('bluebird');
mongoose.connect(mongoDB);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const express = require('express')
const app = express()

const bodyParser= require('body-parser')
//app.use(bodyParser.urlencoded({ extended: true }))
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
require('./routes.js')(app)

app.listen(3000, () => {
})

let legenderyManager = require('./managers/legendaryTripsManager.js');
let data = require('./allTrips.js');
//legenderyManager.saveTrips(data);
