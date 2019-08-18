const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

// Load User model
const User = require('../models/User');

// Define local strategy
const local = new LocalStrategy(
  {
    // clearly specify req.body fields
    usernameField: 'login',
    passwordField: 'password'
  },
  function(login, password, done) {
    // Try to found user by the login
    User.findOne({ login }, function(err, user) {
      if (err) return done(err);

      // If user not found send message
      if (!user)
        return done(null, false, {
          message: 'User with this login do not exist'
        });

      // If wrong password send message
      if (!user.verifyPassword(password))
        return done(null, false, { message: 'Wrong password' });

      // Send found user
      return done(null, user);
    });
  }
);

module.exports = function(passport) {
  passport.use(local);

  // TODO: consider serialize and deserialize only user ID
  // to avoid unnecessary DB requests
  passport.serializeUser(function(user, done) {
    // Serialize user id to session
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    // Deserialize user from Mongo DB
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
