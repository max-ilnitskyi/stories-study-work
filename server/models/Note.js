const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  title: { type: String },
  text: { type: String, required: true },
  color: { type: String },
  createdAt: { type: Date }
});

module.exports = mongoose.model('Note', NoteSchema);