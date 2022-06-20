import express from 'express';
import morgan from 'morgan';
import userRouter from './api/users/users-router.js';
import productRouter from './api/products/products-router.js';

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/users', userRouter);
app.use('/products', productRouter);

app.use((err, req, res) => {
     console.log(err);
     res.status(409).send(JSON.stringify({ message: err.message }));
});

export default app;
