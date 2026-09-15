import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index:true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: [true, "Password is required"]
  },
  refreshToken: {
    type:String
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

UserSchema.methods.generateAccessToken = function(){
  return jwt.sign(
    {
    _id: this._id,
    email: this.email,
    userName: this.userName,

  },
  process.env.ACCESS_TOKEN_SECRET,
  {
    expiresIn:process.env.ACCESS_TOKEN_SECRET_EXPIRES_IN
  }
)
}

UserSchema.methods.generateRefreshToken = function (){
  return jwt.sign(
    {
      _id:this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn:REFRESH_TOKEN_SECRET_EXPIRES_IN
    }
  )
}

const User = mongoose.model('User', UserSchema)

export { User }