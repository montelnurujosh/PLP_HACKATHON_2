const { Router } = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const router = Router()

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body || {}
    if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' })
    const exists = await User.findOne({ email })
    if (exists) return res.status(409).json({ error: 'Email already in use' })
    const passwordHash = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, passwordHash })
    const token = jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' })
    res.json({ token, user: { id: String(user._id), name: user.name, email: user.email } })
  } catch (e) {
    res.status(500).json({ error: 'Signup failed' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {}
    if (!email || !password) return res.status(400).json({ error: 'Missing fields' })
    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ error: 'Invalid credentials' })
    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' })
    const token = jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' })
    res.json({ token, user: { id: String(user._id), name: user.name, email: user.email } })
  } catch (e) {
    res.status(500).json({ error: 'Login failed' })
  }
})

module.exports = router




