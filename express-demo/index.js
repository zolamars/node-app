const startupDebugger = require('debug')('app:startup')
const dbDebugger = require('debug')('app:db')
const config = require('config')
const morgan = require('morgan')
const helmet = require('helmet')
const Joi = require("joi");
const logger = require('./logger')
const express = require("express");
const app = express();

app.set('view engine', 'pug')
app.set('views', './views')

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
// console.log(app.get('env'))
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(helmet())

// Config
console.log('App Name:', config.get('name'))
console.log('Mail Server:', config.get('mail.host'))
// console.log('Mail Password:', config.get('mail.password'))

if(app.get('env')==='development'){
    app.use(morgan('tiny'))
    startupDebugger('Morgan enabled')
}

// DB debugger
dbDebugger('Connected to the database')
app.use(logger.log);
app.use(logger.authenticate);

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

app.get("/", (req, res) => {
  res.render("index", {title: "My Express App", message: "Hello there"});
});

// GET ALL
app.get("/api/courses", (req, res) => {
  res.send(courses);
});

// GET ONE
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((item) => item.id === parseInt(req.params.id));

  if (!course)
    return res.status(404).send("The course with the given ID was not found.");
  res.send(course);
});

app.get("/api/posts/:year/:month", (req, res) => {
  res.send(req.query);
});

// POST
app.post("/api/courses", (req, res) => {
  const { error, value } = validateCourse(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const course = {
    id: courses.length + 1,
    name: value.name,
  };
  courses.push(course);
  res.send(course);
});

// PUT
app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((item) => item.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found.");

  //Validate
  const { error, value } = validateCourse(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // update
  course.name = value.name;
  res.send(course);
});

// DELETE
app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((item) => item.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found.");

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(course);
}

// PORT
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
