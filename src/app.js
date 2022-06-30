/* eslint-disable no-unused-vars */
import express from 'express';
import mongoose from 'mongoose';
import userRouter from './api/users/users-router.js';
import productRouter from './api/products/products-router.js';

mongoose.connect('mongodb+srv://root:root@marvel.ez6ozm5.mongodb.net/?retryWrites=true&w=majority');

const app = express();

app.use(express.json());

app.use('/users', userRouter);
app.use('/products', productRouter);

app.use((err, req, res, next) => {
     console.log(err);
     res.status(err.statusCode).json({ errors: [{ ...err }] });
});

export default app;
