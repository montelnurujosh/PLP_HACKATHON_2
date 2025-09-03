const { Router } = require('express')

const courses = require('./courses')
const lessons = require('./lessons')
const users = require('./users')
const community = require('./community')
const progress = require('./progress')
const auth = require('./auth')

const router = Router()

router.use('/courses', courses)
router.use('/lessons', lessons)
router.use('/users', users)
router.use('/community', community)
router.use('/progress', progress)
router.use('/auth', auth)

module.exports = router


