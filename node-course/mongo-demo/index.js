const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/playground')
  .then(() => {console.log('Connected to MongoDB...')})
  .catch((err) => {console.log('Could not connect to MongoDB...', err)});

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [ String ],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

const Course = mongoose.model( 'Course', courseSchema );

async function createCourse(params) {
  const course = new Course({
    name: 'Angular Course', 
    author: 'Mosh',
    tags: [
      'Angular',
      'Frontend'
    ],
    isPublished: true
  });
  
  const result = await course.save();
  console.log(result);
};

async function getCourses() {
  // Comparison Query Operators
  // eq (equal)
  // ne (not equal)
  // gt (greater than)
  // gte (greater than or equal to)
  // lt (less than)
  // lte (less than or equal to)
  // in
  // nin (not in)

  // Logical Query Operators
  // or
  // and
  
  const result = await Course
    // .find({price: { $gt: 10, $lte: 20 } }) // $ indicates that it is an operator - this will return prices greater than $10 and less than or equal to $20
    // .find({price: { $in: [10, 15, 20] } }) // this returns courses that cost either $10, $15, $20
    // .find() // connects to the .or
    // .or([ { author: 'Mosh' }, { isPublished: true } ]) // will return courses that are authored by Mosh, OR isPublished = true
    // Starts with Mosh
    // .find({ author: /^Mosh/ }) // using regex in query
    // Ends with Hamedani
    // .find({ author: /Hamedani$/i })
    // Contains Mosh
    // .find({ author: /.*Mosh.*/i }) // i for case insensitive
    .find({ author: 'Mosh', isPublished: true }) // add object to filter
    .limit(10)
    .sort({ name: 1 }) // ascending order, -1 is descending order
    .select({ name: 1, tags: 1 }) // only show these properties
    // .count(); // returns the number of documents that match criteria
  console.log(result);
};

getCourses();