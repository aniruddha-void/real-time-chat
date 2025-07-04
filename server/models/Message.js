import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
  sender: String,
  text: String,
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Message', messageSchema)
