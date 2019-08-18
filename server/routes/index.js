const express = require('express');

const stories = require('./stories');
const user = require('./user');

const router = new express.Router();

router.use('/stories', stories);
router.use('/user', user);

module.exports = router;
