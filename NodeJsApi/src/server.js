let mongoose = require('mongoose')
let mongoDB = 'mongodb://admin:1234@ds239117.mlab.com:39117/colman';

mongoose.Promise = require('bluebird');
mongoose.connect(mongoDB);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const express = require('express')
const app = express()

const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
require('./routes.js')(app)

app.listen(3000, () => {
    console.log("running on port 3000");
})