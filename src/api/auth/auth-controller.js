import { signInS, signUpS, verifyEmailS } from './auth-servis.js';

export const signInC = async (req, res, next) => {
     try {
          const signIn = await signInS(req.body);
          res.status(200).json(signIn);
     } catch (err) {
          next(err);
     }
};
export const signUpC = async (req, res, next) => {
     try {
          const { body } = req;
          const signup = await signUpS(body);
          res.status(201).json(signup);
     } catch (err) {
          next(err);
     }
};

export const verifyEmailC = async (req, res, next) => {
     try {
          const { body } = req;
          const verify = await verifyEmailS(body.token);
          res.status(201).json(verify);
     } catch (err) {
          next(err);
     }
};
