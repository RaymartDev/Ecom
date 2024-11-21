import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from "cookie-parser";

import api from './api';

import * as middlewares from './middlewares';

require('dotenv').config();

const app = express();

app.use(express.json()); // Middleware to parse JSON

const corsOptions = {
    origin: process.env.NODE_ENV === 'production' ? ['http://localhost:3000', 'http://frontend:3000'] : ['*'], // Allow all origins in development, restrict in production
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow all basic request methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
    credentials: true, // Allow cookies to be sent if needed
};

if (process.env.NODE_ENV === 'production') {
    app.use(morgan('tiny'));  // Default "combined" format for production
} else {
    app.use(morgan('combined'));       // More verbose logging in development
}

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;