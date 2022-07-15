import {
     createUserS, deleteUserS, getUserS, getUsersS, updateUserS,
} from './users-server.js';

export const getUsersC = async (req, res, next) => {
     try {
          const got = await getUsersS();
          res.status(200).json(got);
     } catch (err) {
          next(err);
     }
};
export const getUserC = async (req, res, next) => {
     try {
          const got = await getUserS(req.params.id);
          res.status(200).json(got);
     } catch (err) {
          next(err);
     }
};
export const deleteUserC = async (req, res, next) => {
     try {
          await deleteUserS(req.params.id);
          res.status(200).json({ message: 'User deleted' });
     } catch (err) {
          next(err);
     }
};
export const createUserC = async (req, res, next) => {
     try {
          await createUserS(req.body);
          res.status(201).json({ message: 'User created' });
     } catch (err) {
          next(err);
     }
};
export const updateUserC = async (req, res, next) => {
     try {
          const { body, params } = req;
          await updateUserS(params.id, body);
          res.status(201).json({ message: 'User updated' });
     } catch (err) {
          next(err);
     }
};
