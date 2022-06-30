import {
     createUserF, deleteUserF, getUserF, getUsersF, updateUserF,
} from './users-factory.js';

export const getUsersC = async (req, res, next) => {
     try {
          const got = await getUsersF();
          res.status(200).json(got);
     } catch (err) {
          next(err);
     }
};
export const getUserC = async (req, res, next) => {
     try {
          const got = await getUserF(req.params.id);
          res.status(200).json(got);
     } catch (err) {
          next(err);
     }
};
export const deleteUserC = async (req, res, next) => {
     try {
          const deleted = await deleteUserF(req.params.id);
          res.status(200).json(deleted);
     } catch (err) {
          next(err);
     }
};
export const createUserC = async (req, res, next) => {
     try {
          const created = await createUserF(req.body);
          res.status(201).json(created);
     } catch (err) {
          next(err);
     }
};
export const updateUserC = async (req, res, next) => {
     try {
          const { body, params } = req;
          const updated = await updateUserF(params.id, body);
          res.status(201).json(updated);
     } catch (err) {
          next(err);
     }
};
