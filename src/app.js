/* eslint-disable no-unused-vars */
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';
import userRouter from './api/users/users-router.js';

import authRouter from './api/auth/auth-router.js';
import { authorization, isAdmine } from './utils/auth-middleware.js';

import { creatAdmine } from './utils/Admin.js';

const { MONGO_USER, MONGO_PASSWORD } = process.env;
const mongoURI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@marvel.ez6ozm5.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(mongoURI)
     .then(() => {
          console.log('MongoDB connected ...');
     })
     .catch((err) => console.log(err.message));

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

creatAdmine();
app.use('/auth', authRouter);
app.use('/users', authorization, isAdmine, userRouter);

app.use((err, req, res, next) => {
     console.log(err);
     res.status(err.statusCode || 500).json({ errors: [{ ...err }] });
});

export default app;
