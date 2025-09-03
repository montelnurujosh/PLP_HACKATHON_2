const data = require('../data')
const User = require('../models/User')
const { asClient } = require('../utils/transform')

async function getCurrentUser(req, res) {
  try {
    const existing = await User.findOne().lean()
    if (existing) return res.json(asClient(existing))
    // Fallback: return seed user
    return res.json(data.user)
  } catch (e) {
    return res.status(500).json({ error: 'Failed to load user' })
  }
}

module.exports = { getCurrentUser }


