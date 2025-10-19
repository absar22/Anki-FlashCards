const dotenv = require('dotenv')
const express = require('express')
const connectDB = require('./config/db')
const session = require('express-session')
const passport = require('passport')
require('./config/passport')(passport)
const MongoStore = require('connect-mongo')
const flash = require('express-flash')


const methodOverride = require('method-override')
const path = require('path')

const mainRoutes = require('./routes/mainRoutes')
const cardRoutes = require('./routes/cardRoutes')
const authRoutes = require('./routes/authRoutes')

const app = express()
const PORT = process.env.PORT || 5000

// ✅ Load env vars
dotenv.config({ path: './config/config.env' })

// ✅ Connect Database
connectDB()

// ✅ Middleware setup
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))

// ✅ Session setup (required for passport + flash)
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.DB_STRING })
}))



// ✅ Passport setup
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())  // ✅ after session middleware

// Make flash messages available globally
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error') // ✅ this one is for passport failures
  res.locals.user = req.user || null
  next()
})

// ✅ Routes
app.use('/', mainRoutes)
app.use('/', cardRoutes)
app.use('/', authRoutes)

// ✅ Server start
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
