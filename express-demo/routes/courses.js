const Joi = require("joi");
const express = require("express");
const router = express.Router();
const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

// GET ALL
router.get("/", (req, res) => {
  res.send(courses);
});

// GET ONE
router.get("/:id", (req, res) => {
  const course = courses.find((item) => item.id === parseInt(req.params.id));

  if (!course)
    return res.status(404).send("The course with the given ID was not found.");
  res.send(course);
});

router.get("/api/posts/:year/:month", (req, res) => {
  res.send(req.query);
});

// POST
router.post("/", (req, res) => {
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
router.put("/:id", (req, res) => {
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
router.delete("/:id", (req, res) => {
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

module.exports = router;
