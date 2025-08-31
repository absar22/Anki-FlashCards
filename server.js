const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const app = express()
const mainRoutes = require('./routes/mainRoutes')
const cardRoutes = require('./routes/cardRoutes') 
const PORT = process.env.PORT || 5000

// Load env vars
dotenv.config({path:'./config/config.env'})

// Connect Database
connectDB()

// Middleware
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.use('/', mainRoutes)
app.use('/', cardRoutes) 



app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

