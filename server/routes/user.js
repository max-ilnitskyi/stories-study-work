const express = require('express');
const passport = require('passport');

const User = require('../models/User');
const config = require('../config');

const router = new express.Router();

// Get user from session
router.get('/', (req, res, next) => {
  // If user not logged in
  if (!req.user) return res.jsonOk({ user: null });

  res.jsonOk({ user: req.user.trimForClient() });
});

// Get check is user exist
router.post('/check-login', (req, res, next) => {
  // If login to chck not receved
  if (req.body.login == undefined)
    return res.jsonReject('There is no login to check');

  const checkQuery = User.exists({ login: req.body.login });

  checkQuery
    .then(exist => res.jsonOk({ isFree: !exist }))
    .catch(err => next(err));
});

// Registrate new user
router.post('/registrate', (req, res, next) => {
  // If user already logged send reject
  if (req.user) return res.jsonReject('You already logged in');

  const reqUserData = req.body;

  // If some data for registration missing
  if (!reqUserData || !reqUserData.login || !reqUserData.password)
    return res.jsonReject('Need login and password to registrate');

  // Try to find user with same login
  const findQuery = User.findOne({ login: reqUserData.login });
  findQuery.exec((err, data) => {
    if (err) return next(err);

    // login already used
    if (data) return res.jsonReject('User already exist');

    // Define new user
    const newUser = new User();
    newUser.login = reqUserData.login;
    newUser.setPassword(reqUserData.password);

    // Try to save new user
    newUser
      .save()
      .then(user => {
        // Manually login passport, send user data if successfully
        req.login(user, function(err) {
          if (err) return next(err);

          return res.jsonOk({ user: user.trimForClient() });
        });
      })
      .catch(err => next(err));
  });
});

// login
router.post('/login', (req, res, next) => {
  // If user already logged send user data to client
  if (req.user) return res.jsonReject('You already logged in');

  const userToLogin = req.body;

  // If some data for login missing
  if (!userToLogin || !userToLogin.login || !userToLogin.password)
    return res.jsonReject('Need login and password to login');

  // Use passport auth with castom callback
  passport.authenticate('local', function(err, user, info) {
    if (err) return next(err);

    // If user not passed, reason must be in info.message. So send it
    if (!user) return res.jsonReject(info.message);

    // Manually login passport, send user data if successfully
    req.login(user, function(err) {
      if (err) return next(err);

      return res.jsonOk({ user: user.trimForClient() });
    });
  })(req, res, next); // Run middleware on the spot
});

// logout
router.post('/logout', (req, res, next) => {
  req.logout();

  res.jsonOk();
});

module.exports = router;
