/* eslint-disable no-unused-vars */
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';
import userRouter from './api/users/users-router.js';
import productRouter from './api/products/products-router.js';
import authRouter from './api/auth/auth-router.js';
import { authorization } from './utils/auth-middleware.js';

const { MONGO_USER, MONGO_PASSWORD } = process.env;
const mongoURI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@marvel.vmeummf.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(mongoURI)
     .then(() => {
          console.log('MongoDB connected ...');
     })
     .catch((err) => console.log(err.message));

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/users', authorization, userRouter);
app.use('/products', authorization, productRouter);

app.use((err, req, res, next) => {
     console.log(err);
     res.status(err.statusCode || 500).json({ errors: [{ ...err }] });
});

export default app;
