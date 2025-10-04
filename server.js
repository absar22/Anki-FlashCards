const dotenv = require('dotenv')
const express = require('express')
const connectDB = require('./config/db')
const session = require('express-session')
// const passport = require('./config/passport')
const passport = require('passport')
require('./config/passport')(passport)

const MongoStore = require('connect-mongo')
const app = express()
const path = require('path');
const mainRoutes = require('./routes/mainRoutes')
const cardRoutes = require('./routes/cardRoutes') 
const authRoutes = require('./routes/authRoutes')


const methodOverride = require('method-override')
const PORT = process.env.PORT || 5000

// Load env vars
dotenv.config({path:'./config/config.env'})

// Connect Database
connectDB()

// Middleware
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.DB_STRING  })
}))

app.use(passport.initialize())
app.use(passport.session())

// Make user available in all EJS views
app.use((req, res, next) => {
  res.locals.user = req.user || null
  next()
})

app.use('/', mainRoutes)
app.use('/', cardRoutes) 
app.use('/', authRoutes)




app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

