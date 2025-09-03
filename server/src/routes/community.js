const { Router } = require('express')
const { getDiscussions } = require('../controllers/community')

const router = Router()

router.get('/discussions', getDiscussions)

module.exports = router



