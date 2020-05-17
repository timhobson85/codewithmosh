const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
  .then(() => { console.log('Connected to MongoDB...')})
  .catch((err) => { console.log('Could not connect to MongoDB', err)})

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [ String ],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number
});

const Course = mongoose.model( 'Course', courseSchema );

async function getCourses(){
  return await Course
    .find({ isPublished: true})
    .find({ isPublished: true})
    .or( [ { tags: 'backend'}, {tags: 'frontend' } ] )
    .sort('-price') // for descending '-name'
    .select('name author price')
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();
