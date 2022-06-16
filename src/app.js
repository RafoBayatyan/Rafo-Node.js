import express from 'express';
import userRouter from './api/users/users-router.js';
import productRouter from './api/product/product-router.js';

const app = express();

app.use(express.json());
app.use('/users', userRouter);
app.use('/product', productRouter);

export default app;
