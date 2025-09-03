const { Router } = require('express')
const { getLessonsByCourseId, getLessonById, markLessonComplete } = require('../controllers/lessons')
const { authRequired } = require('../middleware/auth')

const router = Router()

router.get('/course/:courseId', getLessonsByCourseId)
router.get('/:courseId/:lessonId', getLessonById)
router.post('/:courseId/:lessonId/complete', authRequired, markLessonComplete)

module.exports = router


