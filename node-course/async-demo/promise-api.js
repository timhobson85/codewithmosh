// const p = Promise.resolve({id: 1});
// const p = Promise.reject(new Error('reason for rejection'));

// p
//   .then(result => console.log(result))
//   .catch(error => console.log(error));

const p1 = new Promise((resolve) => {
  setTimeout(() => {
    console.log('Async Operation 1...')
    resolve(1);
  }, 500);
});
const p2 = new Promise((resolve) => {
  setTimeout(() => {
    console.log('Async Operation 2...')
    resolve(2);
  }, 500);
});

// this returns when all included promises are resolved.
// Promise.all([p1, p2])
// this returns the result of the first fulfilled promise
Promise.race([p1, p2])
  .then(result => console.log(result))
  .catch(err => console.log('error', err.message))