const mongoose = require('mongoose');

// Initially not connected and connection not started
let isConnected = false;
let connectionStarted = false;

const startConnection = mongodbUri => {
  // startConnection can be used only once
  if (connectionStarted) return console.log('Must be only one DB connection!');
  connectionStarted = true;

  // Set callbacks on connection events
  mongoose.connection.on('connected', () => {
    isConnected = true;
    console.log('DB connection succeed, uri: ', mongodbUri);
  });
  mongoose.connection.on('error', err => {
    isConnected = false;
    console.log('DB connection error: ', err);
  });
  mongoose.connection.on('disconnected', () => {
    isConnected = false;
    console.log('DB disconnected, trying to connect again...');
    connect(); // If disconnected trying to connect again
  });

  // Connect to MongoDB
  connect();

  // Define connect function to use in different places
  function connect() {
    mongoose.connect(
      mongodbUri,
      { useNewUrlParser: true }
    );
  }
};

// Middleware to check connection to DB
const checkConnection = (req, res, next) => {
  if (isConnected) {
    next();
  } else {
    next(new Error('Mongo DB not connected'));
  }
};

module.exports = { startConnection, checkConnection };
