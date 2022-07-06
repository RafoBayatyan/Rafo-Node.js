import {
     signinF, signupF,
} from './auth-factory.js';

export const signinC = async (req, res, next) => {
     try {
          const signin = await signinF(req.body);
          res.status(201).json(signin);
     } catch (err) {
          next(err);
     }
};
export const signupC = async (req, res, next) => {
     try {
          const { body } = req;
          const signup = await signupF(body);
          res.status(201).json(signup);
     } catch (err) {
          next(err);
     }
};
