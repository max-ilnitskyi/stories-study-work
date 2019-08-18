const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const logger = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);

const config = require('./config');
const routes = require('./routes');
const mongoConnection = require('./utils/mongoConnection');
const sendJsonExtending = require('./utils/sendJsonExtending');
const configPassport = require('./config/passport');

// Add res.jsonOk and res.jsonReject custom methods
sendJsonExtending(express);

// Create app
const app = express();

// Connect to DB and add event handlers for disconnect, etc...
mongoConnection.startConnection(config.mongodbUri);

app.use(helmet()); // secure headers
app.use(logger('dev')); // log request information
app.use(compression()); // compress response

// Parse request body if json or urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Express only serves static assets in production
// For development this job does client dev server
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, config.staticBuildRelativePath)));
}

// Connect sessions
app.use(
  session({
    secret: config.secret,
    cookie: { maxAge: 60000 * 60 },
    rolling: true,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

// Connect passport
configPassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// Connect API routes
app.use('/api', mongoConnection.checkConnection, routes);

// In case API route not found
app.use('/api', (req, res) => {
  res.status(404).send('Wrong request to API');
});

// If get request, always send index.html (if not resolved before)
if (process.env.NODE_ENV === 'production') {
  // Path to index.html file
  const indexPath = path.join(
    __dirname,
    config.staticBuildRelativePath,
    'index.html'
  );

  // send index.html to all get requests if cient accept html
  app.get('*', (req, res, next) => {
    if (!req.accepts('html')) next();

    res.sendFile(indexPath);
  });
}

// Global not found
app.use((req, res) => {
  res.sendStatus(404);
});

// Global errors handler, send server error 500
app.use((error, req, res, next) => {
  console.log(`-----express error: `, error);

  res.sendStatus(500);
});

// Run server
app.listen(config.serverPort, () => {
  console.log(`Server running on port ${config.serverPort}`);
});
