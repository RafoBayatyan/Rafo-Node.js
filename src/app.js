/* eslint-disable no-unused-vars */
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import 'dotenv/config';
import userRouter from './api/users/users-router.js';
import productRouter from './api/products/products-router.js';
import authRouter from './api/auth/auth-router.js';
import { authorization, authorizationAdmin } from './utils/auth-middleware.js';
import { User } from './models/user-model.js';
import { getUserByEmailUnCheckS } from './api/users/users-server.js';
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
     app.use('/client', authorization, userRouter);
     app.use('/auth', authRouter);
     app.use('/users', authorizationAdmin, userRouter);
     app.use('/products', authorizationAdmin, productRouter);
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
