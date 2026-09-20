
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
    default: 'general',
    trim:true
  },
  user: {  
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
},{timestamps:true})

export const Card = mongoose.model('Card', CardSchema)
