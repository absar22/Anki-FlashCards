import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    toLower: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },
  refreshToken: {
    type:String,
    required:true
  }
})

// Hash password before saving
UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return

  this.password = await bcrypt.hash(this.password, 10)
})

// Compare password for login
UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

const generateAccessToken = 

const User = mongoose.model('User', UserSchema)

export { User }