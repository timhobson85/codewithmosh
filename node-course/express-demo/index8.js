// const startupDebugger = require('debug')('app:startup');
// const dbDebugger = require('debug')('app:db');
const debug = require('debug')('app:startup');

const morgan = require('morgan');
const express = require('express');
const app = express();

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  //export DEBUG=app:startup
  // startupDebugger('Morgan Enabled...');
  debug('Morgan Enabled...'); // replaces console.log() and can be turned on and off...
};

// Db work...
// run below in terminal
// export DEBUG=app:startup,app:db
// export DEBUG=app:* // also works
// DEBUG=app:db nodemon index.js
// dbDebugger('Connected to the database...');

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));