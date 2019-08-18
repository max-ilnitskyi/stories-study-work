const express = require('express');

const Story = require('../models/Story');
const config = require('../config');

const router = new express.Router();

// Send user stories
router.get('/', (req, res, next) => {
  // If user not logged in
  if (!req.user || !req.user._id) return res.jsonOk({ stories: null });

  // Find stories by user id and send
  const findQuery = Story.find({ user: req.user._id });
  findQuery.sort('-createdAt'); // Begin with newest
  findQuery.then(stories => res.jsonOk({ stories })).catch(err => next(err));
});

// Send all stories
router.get('/all', (req, res, next) => {
  // Find and send all stories with populated user field
  const findQuery = Story.find().populate({
    path: 'user',
    select: 'login -_id'
  });
  findQuery.sort('-createdAt'); // Begin with newest
  findQuery.then(stories => res.jsonOk({ stories })).catch(err => next(err));
});

// Send single story
router.get('/:id', (req, res, next) => {
  // Find and send single story with populated user field
  const findQuery = Story.findById(req.params.id).populate({
    path: 'user',
    select: 'login -_id'
  });
  findQuery.then(story => res.jsonOk({ story })).catch(err => next(err));
});

// Post new story
router.post('/', (req, res, next) => {
  // If user not logged in
  if (!req.user || !req.user._id) return res.jsonReject('You not logged in');

  const reqPostData = req.body;

  // Define new story
  const newStory = new Story({
    title: reqPostData.title,
    text: reqPostData.text,
    color: reqPostData.color
  });

  // Set user id to story
  newStory.user = req.user._id;

  // Try to save new story
  newStory
    .save()
    .then(data => res.jsonOk())
    .catch(err => next(err));
});

// Delete story by id
router.delete('/:id', (req, res, next) => {
  // If user not logged in
  if (!req.user || !req.user._id) return res.jsonReject('You not logged in');

  // Find story by id from params
  const findQuery = Story.findById(req.params.id);

  findQuery.exec((err, story) => {
    if (err) return next(err);

    // If story not found
    if (!story) return res.jsonReject('Story you try to delete not found');

    // If story creator not current user
    if (String(req.user._id) !== String(story.user))
      return res.jsonReject('You can delete only own stories');

    // Try to delete story
    const deleteQuery = Story.findByIdAndDelete(story._id);
    deleteQuery.then(data => res.jsonOk()).catch(err => next(err));
  });
});

module.exports = router;
