/* eslint-disable no-unused-vars */
import { validationResult } from 'express-validator';
import express from 'express';
import userRouter from './api/users/users-router.js';
import productRouter from './api/products/products-router.js';

const app = express();

app.use(express.json());

app.use('/users', userRouter);
app.use('/products', productRouter);

app.use((err, req, res, next) => {
     console.log(err);
     res.status(err.statusCode).json({ errors: [{ ...err }] });
});

export default app;
