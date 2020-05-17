
const p = new Promise((resolve, reject) => {
  // Kick off some async work
  // ...
  setTimeout(() => {
    // resolve(1); // pending => resolved, fulfilled
    reject(new Error('message')); // pending => rejected
  }, 1000);
});

p
  .then(result => {console.log('result', result)})
  .catch(err => {console.warn('Error', err.message)})

