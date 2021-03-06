'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

module.exports = function () {

  var db = mongoose.connect('mongodb://admin:1234@ds239117.mlab.com:39117/colman');

  var UserSchema = new Schema({
    firstName: {type: String},
    lastName: {type: String},
    email: {
      type: String, required: true,
      trim: true, unique: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    facebookProvider: {
      type: {
        id: String,
        token: String
      },
      select: false
    }
  });

  UserSchema.set('toJSON', {getters: true, virtuals: true});

  UserSchema.statics.upsertFbUser = function(accessToken, refreshToken, profile, cb) {
    var that = this;
    return this.findOne({
      'facebookProvider.id': profile.id
    }, function(err, user) {
      // no user was found, lets create a new one
      if (!user) {
        var newUser = new that({
          fullName: profile.displayName,
          email: profile.emails[0].value,
          facebookProvider: {
            id: profile.id,
            token: accessToken
          }
        });

        newUser.save(function(error, savedUser) {
          if (error) {
            console.log(error);
          }
          return cb(error, savedUser);
        });
      } else {
        return cb(err, user);
      }
    });
  };

  mongoose.model('User', UserSchema);

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

  // create a schema
  let tripSchema = new Schema({
    Title: String,
    Description: String,
    Duration: Number,
    Destinations: [String],
    Link: String,
    Text:String,
    Tags: [String],
    Locations: [String]
   });

   tripSchema.statics.insertTrip = function(trip, cb) {   
    var that = this;
    var newTrip = new that({
      Title: trip.Title,
      Description: trip.Description,
      Duration: trip.Duration,
      Destinations: [trip.Destination],
      Locations: trip.Locations,
      Text: trip.Text,
      Tags:trip.Tags
    });
  
    newTrip.save(function(error, savedTrip) {
      if (error) {
        console.log(error);
      }
      return cb(error, savedTrip);
    });
  };

   tripSchema.set('toJSON', {getters: true, virtuals: true});
   mongoose.model('Trip', tripSchema);

  mongoose.model('LegendaryTrip', legendaryTripSchema);

  return db;
};