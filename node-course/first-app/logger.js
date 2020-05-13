console.log(__filename)
console.log(__dirname)
let url = 'http://mylogger.io/log';

function log(message) {
  // Send a HTTP request.
  console.log(message);
};

module.exports = log;