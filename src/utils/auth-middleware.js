import { errorAuth } from '../constants/constants-error.js';
import { ServisError } from './custom-errors.js';
import { verify } from './JWT.js';

export const authorization = (req, res, next) => {
     try {
          const token = (req.headers.authorization).split(' ')[1];
          const verified = verify(token);
          req.user = { id: verified.id };
          next();
     } catch (err) {
          next(new ServisError(401, 'Token', errorAuth));
     }
};
export const isAdmine = (req, res, next) => {
     try {
          const token = (req.headers.authorization).split(' ')[1];
          const verified = verify(token);
          req.user = { id: verified.id };
          if (!verified.isAdmine) {
               throw new ServisError(401, 'Admin', 'no Admine ');
          }
          next();
     } catch (err) {
          next(new ServisError(401, 'Token', errorAuth));
     }
};
