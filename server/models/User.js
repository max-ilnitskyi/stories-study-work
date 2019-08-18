const mongoose = require('mongoose');
const crypto = require('crypto');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  login: { type: String, required: true },
  hash: { type: String, required: true },
  salt: { type: String, required: true }
});

// Method to verify heshed password
UserSchema.methods.verifyPassword = function(password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex');
  return this.hash === hash;
};

// Method to set heshed password
UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex');
};

// Method to prepare user object before send to trimForClient
// Mainly to remove secure data
UserSchema.methods.trimForClient = function() {
  return {
    login: this.login
  };
};

module.exports = mongoose.model('User', UserSchema);
