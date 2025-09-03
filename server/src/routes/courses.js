const { Router } = require('express')
const { getAllCourses, getCourseById } = require('../controllers/courses')

const router = Router()

router.get('/', getAllCourses)
router.get('/:courseId', getCourseById)

module.exports = router



