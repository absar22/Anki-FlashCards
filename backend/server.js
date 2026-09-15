import dotenv from 'dotenv'
dotenv.config({
  path:'./config.env'
})
import express from 'express'
import connectDB from './config/db.js'
import session from 'express-session'
import passport from 'passport'
import {configurePassport} from './config/passport.js'
import MongoStore from 'connect-mongo'  //stores Express session data in MongoDB
import {mainRoutes} from './routes/mainRoutes.js'
import {cardRoutes }from './routes/cardRoutes.js'
import {authRoutes} from './routes/authRoutes.js'

const app = express()
const PORT = process.env.PORT || 5000


// Connect Database
connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// Session setup
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.DB_STRING
  })
}))


// Passport setup
configurePassport(passport)
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use('/', mainRoutes)
app.use('/', cardRoutes)
app.use('/', authRoutes)
// Server start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})