import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './src/config/connect.js';
import router from './src/routes/authRoutes.js';
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    optionsSuccessStatus: 200,
    // allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};
app.use( cors(corsOptions) );


app.use( cors() );
app.use( express.json() );
app.use( cookieParser() );
app.use('/api/auth', router);


const PORT = process.env.PORT || 3000;

// Database connection
connectDB();


app.get('/', (req, res) => {
    res.send('Server is running...');
} )

app.listen( PORT, () => {
    console.log(`http://localhost:${PORT}` );
} )