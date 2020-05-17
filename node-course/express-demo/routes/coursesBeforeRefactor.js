app.get('/api/courses', (req, res) =>{
  res.send(courses);
});

app.post('/api/courses', (req, res) => {
  const { error } = validateCourse(req.body); // result.error
  if (error) return res.status(400).send(error.details[0].message)
  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
  // Look up the course
  // If not existing, return 404
  const course = courses.find( c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The course with the given ID was not found');

  // Validate the course
  // If invaliud, return 400 - Bad Request
  const { error } = validateCourse(req.body); // result.error
  if (error) return res.status(400).send(error.details[0].message)

  // Update the Course
  course.name = req.body.name;
  // Return the updated course
  res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
  // Look up the course
  // Not existing, return 404
  const course = courses.find( c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The course with the given ID was not found');

  // Delete
  const index = courses.indexOf(course)
  courses.splice(index, 1);
  // Return the same course
  res.send(course);
});

function validateCourse(course){
  const schema = {
    name: Joi.string().min(3).required()
  };
  return Joi.validate(course, schema);
}

app.get('/api/courses/:id', (req, res) => {
   const course = courses.find( c => c.id === parseInt(req.params.id));
   if (!course) return res.status(404).send('The course with the given ID was not found');
   res.send(course);
});