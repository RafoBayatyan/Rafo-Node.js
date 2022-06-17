import express from 'express';

import userRouter from './api/users/users-router.js';
import productRouter from './api/product/product-router.js';

const app = express();
app.use(bodyParser.json()); 
app.use(express.json());
app.use('/users', userRouter);
app.use('/product', productRouter);
app.use((err, req, res, next) => {
     console.log(err);
     res.status(409).send(JSON.stringify({ message: err.message }));
});



export default app;
