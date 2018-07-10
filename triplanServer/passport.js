'use strict';

var passport = require('passport'),
  FacebookTokenStrategy = require('passport-facebook-token'),
  User = require('mongoose').model('User');

module.exports = function () {

  passport.use(new FacebookTokenStrategy({
      clientID: '1742190389157148',
      clientSecret: 'a29b8cab5a8e11d00d0aca62a917737a'
    },
    function (accessToken, refreshToken, profile, done) {
      User.upsertFbUser(accessToken, refreshToken, profile, function(err, user) {
        return done(err, user);
      });
    }));

};