import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json({limit: '16kb'}));
app.use(express.urlencoded({limit: '16kb', extended: true}));
app.use(cookieParser());


import { authRoutes } from './routes/authRoutes.js';
import { cardRoutes } from './routes/cardRoutes.js';

app.use('/api/v1', authRoutes)
app.use('/api/v1/cards' , cardRoutes)


export {app}