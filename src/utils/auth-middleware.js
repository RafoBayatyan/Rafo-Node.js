import { errorAuth } from '../constants/constants-error.js';
import { ServerError } from './custom-errors.js';
import { verify } from './JWT.js';

export const authorizationAdmin = (req, res, next) => {
     try {
          const token = (req.headers.authorization).split(' ')[1];
          const verified = verify(token);
          if (!verified.isAdmin) {
               next(new ServerError(401, 'Token', errorAuth));
          }
          req.user = { id: verified.id };
          next();
     } catch (err) {
          next(new ServerError(401, 'Token', errorAuth));
     }
};
export const authorization = (req, res, next) => {
     try {
          const token = (req.headers.authorization).split(' ')[1];
          const verified = verify(token);
          req.user = { id: verified.id };
          next();
     } catch (err) {
          next(new ServerError(401, 'Token', errorAuth));
     }
};
