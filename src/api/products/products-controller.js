import {
     createProductF, deleteProductF, getProductF, getProductsF, updateProductF,
} from './products-factory.js';

export const getProductsC = async (req, res, next) => {
     try {
          const got = await getProductsF();
          res.status(200).json(got);
     } catch (err) {
          next(err);
     }
};
export const getProductC = async (req, res, next) => {
     try {
          const got = await getProductF(req.params.index);
          res.status(200).json(got);
     } catch (err) {
          next(err);
     }
};
export const deleteProductC = async (req, res, next) => {
     try {
          const deleted = await deleteProductF(req.params.index);
          res.status(200).json(deleted);
     } catch (err) {
          next(err);
     }
};
export const createProductC = async (req, res, next) => {
     try {
          const created = await createProductF(req.body);
          res.status(201).json(created);
     } catch (err) {
          next(err);
     }
};
export const updateProductC = async (req, res, next) => {
     try {
          const { body, params } = req;
          const updated = await updateProductF(params.index, body);
          res.status(201).json(updated);
     } catch (err) {
          next(err);
     }
};
