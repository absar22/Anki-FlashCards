import dotenv from 'dotenv'
dotenv.config({
  path:'./config.env'
})
import express from 'express'
import connectDB from './config/db.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'


import {mainRoutes} from './routes/mainRoutes.js'
import {cardRoutes }from './routes/cardRoutes.js'
import {authRoutes} from './routes/authRoutes.js'

const app = express()
const PORT = process.env.PORT || 5000


// Connect Database
connectDB()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({limit:'16kb'}))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(cookieParser());




// Routes
app.use('/', mainRoutes)
app.use('/', cardRoutes)
app.use('/', authRoutes)
// Server start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})