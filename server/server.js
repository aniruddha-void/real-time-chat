import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import http from 'http'
import { Server } from 'socket.io'
import User from './models/User.js'
import bcrypt from 'bcrypt'
const app = express()
app.use(cors())
app.use(express.json())
mongoose.connect('mongodb://127.0.0.1:27017/chatapp')
  .then(() => console.log(' Connected to MongoDB'))
  .catch(err => console.error(' MongoDB error:', err))
app.post('/api/auth/register', async (req, res) => {
  const { username, password } = req.body
  const hashedPassword = await bcrypt.hash(password, 10)
const newUser = new User({ username, password: hashedPassword })
  try {
    const existingUser = await User.findOne({ username })
    if (existingUser) return res.status(400).json({ message: 'Username already taken' })
    const newUser = new User({ username, password })
    await newUser.save()
    console.log('Registered new user:', username)
    res.json({ message: 'User registered successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
})
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body
  const isMatch = await bcrypt.compare(password, user.password)
if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' })
  try {
    const user = await User.findOne({ username })
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    console.log(' Login successful for:', username)
    res.json({ success: true, username })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
})
const server = http.createServer(app)
const io = new Server(server, {
  cors: { origin: '*' },
})
io.on('connection', (socket) => {
  console.log('🔗 New socket connected:', socket.id)
  socket.on('sendMessage', (msg) => {
    io.emit('receiveMessage', msg)
  })
  socket.on('disconnect', () => {
    console.log(' Socket disconnected:', socket.id)
  })
})

server.listen(5000, () => {
  console.log('Server listening on http://localhost:5000')
})
