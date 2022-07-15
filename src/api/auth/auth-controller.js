import { verify } from '../../utils/JWT.js';
import {
     changeForgotS,
     forgotPasswordS, signInS, signUpS, verifyEmailS,
} from './auth-server.js';

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
          const { token } = req.body;

          const verified = await verifyEmailS(token);
          res.status(201).json(verified);
     } catch (err) {
          next(err);
     }
};
export const forgotPasswordC = async (req, res, next) => {
     try {
          const { email } = req.body;
          const got = await forgotPasswordS(email);
          res.status(201).json(got);
     } catch (err) {
          next(err);
     }
};
export const changForgotC = async (req, res, next) => {
     try {
          const { token, newPassword } = req.body;
          const verified = verify(token);
          const forgot = await changeForgotS(verified.id, newPassword);
          res.status(201).json(forgot);
     } catch (err) {
          next(err);
     }
};
