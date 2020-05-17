const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/playground')
  .then(() => {console.log('Connected to MongoDB...')})
  .catch((err) => {console.log('Could not connect to MongoDB...', err)});

const courseSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    minLength: 5,
    maxLength: 255,
    // match: /pattern/
  },
  category: {
    type: String,
    required: true,
    enum: ['web', 'mobile', 'network'],
    lowercase: true,
    // uppercase: true,
    trim: true
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: function(v, callback) {
        setTimeout(() => {
          // do some async work
          const result = v && v.length > 0; 
          callback(result)
        }, 1000);
      },
      message: 'A course should have at least one tag.'
    }
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function() { return this.isPublished; },
    min: 10,
    max: 200,
    get: v => Math.round(v),
    set: v => Math.round(v)
  }
});

const Course = mongoose.model( 'Course', courseSchema );

async function createCourse(params) {
  const course = new Course({
    name: 'Angular Course', 
    category: 'Web',
    author: 'Mosh',
    tags: ['frontend'],
    isPublished: true,
    price: 15.8
  });
  try {
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    for( field in ex.errors)
    console.log(ex.errors[field].message);   
  }
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

  const pageNumber = 2;
  const pageSize = 10;
  // api/courses?pageNumber=2&pageSize=10
  
  const courses = await Course
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
    .find({ _id: '5ec1362583affb086f94118d' }) // add object to filter
    // .skip((pageNumber -1) * pageSize) // used to impliment pagination
    // .limit(pageSize)
    .sort({ name: 1 }) // ascending order, -1 is descending order
    .select({ name: 1, tags: 1, price: 1 }) // only show these properties
    // .count(); // returns the number of documents that match criteria
  console.log(courses[0].price);
};

// async function updateCourse(id) {
//   // approach: Query First
//   // findById()
//   // modify it's properties
//   // save()
//   const course = await Course.findById(id);
//   if (!course) return;

//   course.isPublished = true;
//   course.author = 'Another Author'
  
//   // course.set({ // Same as above, just different
//   //   isPublished: true,
//   //   author: 'Another Author'
//   // });

//   const result = await course.save();
//   console.log(result);
// };

async function updateCourse(id) {
  // approach: Update first
  // Update directly
  // optionally: get the updated document
  // const result = await Course.update({ _id: id }, { // returns the number of updates etc
  //   $set: {
  //     author: 'Mosssssssh',
  //     isPublished: false
  //   }
  // });

  const course = await Course.findByIdAndUpdate(id, {
    $set: {
      author: 'Jason'
    }
  }, { new: true }); // the new: true makes it return the changed entry, not the original entry
  
  console.log(course);
}

async function removeCourse(id) {
  // const result = await Course.deleteMany({isPublished: true}); // will delete all that are set to true
  // const result = await Course.deleteOne({_id: id});
  const course = await Course.findByIdAndRemove(id);
  // console.log(result)
  console.log(course)
}

// removeCourse('5ec0e87a5acea604ebed7b3a');
getCourses();