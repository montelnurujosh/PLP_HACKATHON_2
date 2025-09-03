const data = require('../data')
const Discussion = require('../models/Discussion')
const { asClientArray } = require('../utils/transform')

async function getDiscussions(req, res) {
  try {
    const items = await Discussion.find().lean()
    if (items && items.length) return res.json(asClientArray(items))
  } catch (_) {}
  return res.json(data.discussions)
}

module.exports = { getDiscussions }


