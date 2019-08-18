const express = require('express');

// const notesControllers = require('../controllers/notesControllers');
const Note = require('../models/Note');
const config = require('../config');

const router = new express.Router();

// send all notes
router.get('/', (req, res, next) => {
  const query = Note.find();

  query.then(notes => res.jsonOk({ notes })).catch(err => next(err));
});

// post new note
router.post('/', (req, res, next) => {
  const data = req.body;
  const query = Note.create({
    title: data.title,
    text: data.text,
    color: data.color,
    createdAt: new Date()
  });

  query.then(data => res.json({ ok: true })).catch(err => next(err));
});

// delete note by id
router.delete('/:id', (req, res, next) => {
  const query = Note.findByIdAndDelete(req.params.id);

  query.then(data => res.json({ ok: true })).catch(err => next(err));
});

// wrong request
router.use((req, res) => {
  res.sendStatus(404);
});

module.exports = router;
