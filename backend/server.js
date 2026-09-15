import dotenv from 'dotenv'
dotenv.config({
  path:'./config.env'
})
import express from 'express'
import connectDB from './config/db.js'
import session from 'express-session'
import passport from 'passport'
import {configurePassport} from './config/passport.js'
import MongoStore from 'connect-mongo'
import flash from 'express-flash'
import methodOverride from 'method-override'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

import {mainRoutes} from './routes/mainRoutes.js'
import {cardRoutes }from './routes/cardRoutes.js'
import {authRoutes} from './routes/authRoutes.js'


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


const app = express()
const PORT = process.env.PORT || 5000


// Connect Database
connectDB()


// Middleware setup
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(express.static(path.join(__dirname, 'public')))


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


// Flash
app.use(flash())


// Make flash messages available globally
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  res.locals.user = req.user || null

  next()
})


// Routes
app.use('/', mainRoutes)
app.use('/', cardRoutes)
app.use('/', authRoutes)


// Server start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})