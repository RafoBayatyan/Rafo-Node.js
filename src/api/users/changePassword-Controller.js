import { changePasswordS } from './users-server.js';

export const changePasswordC = async (req, res, next) => {
     try {
          const { body, user } = req;
          await changePasswordS(body, user.id);
          res.status(201).json({ message: 'User Password changes' });
     } catch (err) {
          next(err);
     }
};
