const Joi = require('joi');
const debug = require('debug')('app:startup');
const logger = require('./middlewear/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');
const helmet = require('helmet');
const config = require('config');
const morgan = require('morgan');
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views'); //default

// in terminal: NODE_ENV=development
// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);


// Configuration
console.log('Application Name: ' + config.get('name'))
console.log('Mail Server: ' + config.get('mail.host'))
// in terminal: export app_password=1234
console.log('Mail Password: ' + config.get('mail.password'))

if ( app.get('env') === 'development'){
  app.use(morgan('tiny'));
  console.log('Morgan enabled...')
}

app.use(logger);

app.use(function(req, res, next) { // same as above but not exported from seperate file
  console.log('Authenticating...');
  next();
});


const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`Listening on Port:${port}...`)})