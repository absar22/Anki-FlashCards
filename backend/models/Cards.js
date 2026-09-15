
import mongoose from 'mongoose'
const CardSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true
  },
  answer: {
    type: String,
    required: true,
    trim: true
  },
  tag: {
    type: String,
    default: 'general'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  user: {  // 👈 Add this
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

export const Card = mongoose.model('Card', CardSchema)
