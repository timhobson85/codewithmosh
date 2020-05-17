async function emailMovies( ) {
  try {
    const customer = await getCustomer(1);
    console.log('Customer:', customer)
    if (customer.isGold) {
      const movies = await getTopMovies()
      console.log('Top Movies:', movies)
      const email = await sendEmail(customer.email, movies);
      console.log('Email Sent...');
    }
  } catch (error) {
    console.log('Error:', error.message)
  }
}

emailMovies();


function getCustomer(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ 
        id: 1, 
        name: 'Mosh Hamedani', 
        isGold: true, 
        email: 'email' 
      });
    }, 500);  
  })
}

function getTopMovies() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(['movie1', 'movie2']);
    }, 500);
  })
}

function sendEmail(email, movies) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 500);
  })
}