const { Router } = require('express')
const { getAllProgress, getProgressForCourse, setProgressForCourse } = require('../controllers/progress')
const { authRequired } = require('../middleware/auth')

const router = Router()

router.get('/', authRequired, getAllProgress)
router.get('/:courseId', authRequired, getProgressForCourse)
router.patch('/:courseId', authRequired, setProgressForCourse)

module.exports = router


