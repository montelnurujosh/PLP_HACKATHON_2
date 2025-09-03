const data = require('../data')
const Course = require('../models/Course')
const { asClientArray, asClient } = require('../utils/transform')

async function getAllCourses(req, res) {
  try {
    const items = await Course.find().lean()
    if (items && items.length) {
      const mapped = asClientArray(items)
      const tags = Array.from(new Set(mapped.flatMap((c) => c.tags || [])))
      return res.json({ items: mapped, tags })
    }
  } catch (_) {}
  return res.json({ items: data.courses, tags: data.tags })
}

async function getCourseById(req, res) {
  const { courseId } = req.params
  try {
    const course = await Course.findById(courseId).lean()
    if (course) return res.json(asClient(course))
  } catch (_) {}
  const course = data.courses.find((c) => c.id === courseId)
  if (!course) return res.status(404).json({ error: 'Course not found' })
  return res.json(course)
}

module.exports = { getAllCourses, getCourseById }


