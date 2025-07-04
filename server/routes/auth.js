import express from 'express'
import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body
    const hashed = await bcrypt.hash(password, 10)
    const user = new User({ username, password: hashed })
    await user.save()
    res.status(201).json({ message: 'User registered successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (!user) return res.status(404).json({ error: 'User not found' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    res.json({ token, username })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
