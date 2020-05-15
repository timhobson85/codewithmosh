console.log(__filename)
console.log(__dirname)
const EventEmitter = require('events');

let url = 'http://mylogger.io/log';

class Logger extends EventEmitter {
  log(message) {
    // Send a HTTP request.
    console.log(message);
   
    // Raise: logging (data: message)
    this.emit('messageLogged', {id: 1, url:'hello'})
  };

};

module.exports = Logger;