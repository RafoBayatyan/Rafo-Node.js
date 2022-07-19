/* eslint-disable no-unused-vars */
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import 'dotenv/config';
import clientProductRouter from './api/products/product-client-router.js';
import clientUserRouter from './api/users/user-client-router.js';
import bagRouter from './api/bag/bag-router.js';
import userRouter from './api/users/users-router.js';
import productRouter from './api/products/products-router.js';
import authRouter from './api/auth/auth-router.js';
import { authorizationAdmin, authorizationClient } from './utils/auth-middleware.js';
import User from './models/user-model.js';
import { getUserByEmailUnCheckS } from './api/users/users-service.js';
import { toHashPassword } from './utils/bcrypt.js';

const app = express();

const ExpressMiddleware = () => {
     app.use(morgan('dev'));
     app.use(express.json());
};

const mongoConnection = async () => {
     const { MONGO_USER, MONGO_PASSWORD } = process.env;
     const mongoURI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@marvel.ez6ozm5.mongodb.net/?retryWrites=true&w=majority`;
     try {
          await mongoose.connect(mongoURI);
          console.log('MongoDB connected ...');
     } catch (err) {
          console.log(err.message);
     }
};

const routing = () => {
     app.use('/auth', authRouter);
     // Admin routs
     app.use('/users', authorizationAdmin, userRouter);
     app.use('/products', authorizationAdmin, productRouter);
     app.use('/client', authorizationClient, userRouter);

     // Client routs
     app.use('/client-product', authorizationClient, clientProductRouter);
     app.use('/client', authorizationClient, clientUserRouter);
     app.use('/bag', authorizationClient, bagRouter);
};

const errorHandling = () => {
     app.use((err, req, res, next) => {
          console.log(err);
          res.status(err.statusCode || 500).json({ errors: [{ ...err }] });
     });
};

const createDefaultAdmin = async () => {
     const { ADMIN_EMAIL, ADMIN_PASS } = process.env;
     const existUser = await getUserByEmailUnCheckS(ADMIN_EMAIL);
     if (existUser) {
          console.log('Admin is here');
          return false;
     }

     const admin = {
          firstName: 'Admin',
          lastName: 'Admin',
          age: 27,
          email: ADMIN_EMAIL,
          password: await toHashPassword(ADMIN_PASS),
          job: 'uGeek',
          isVerifiedEmail: true,
          isAdmin: true,
     };

     const user = new User(admin);
     await user.save();
     console.log('Admin is coming');
     return true;
};
const init = async () => {
     ExpressMiddleware();
     await mongoConnection();
     await createDefaultAdmin();
     routing();
     errorHandling();
};

(async () => {
     await init();
})();

export default app;
