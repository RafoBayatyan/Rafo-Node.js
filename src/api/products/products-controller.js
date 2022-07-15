/* eslint-disable max-len */
import {
     createProductS, deleteProductS, getProductS, getProductsS, updateProductS,
} from './products-server.js';

export const getProductC = async (req, res, next) => {
     try {
          const got = await getProductsS();
          res.status(200).json(got);
     } catch (err) {
          next(err);
     }
};
export const getProductsC = async (req, res, next) => {
     try {
          const got = await getProductS(req.params.id);
          res.status(200).json(got);
     } catch (err) {
          next(err);
     }
};
export const deleteProductC = async (req, res, next) => {
     try {
          await deleteProductS(req.params.id);
          res.status(200).json({ message: 'Product deleted' });
     } catch (err) {
          next(err);
     }
};
export const createProductC = async (req, res, next) => {
     try {
          await createProductS(req.body);
          res.status(201).json({ message: 'Product created' });
     } catch (err) {
          next(err);
     }
};
export const updateProductC = async (req, res, next) => {
     try {
          const { body, params } = req;
          await updateProductS(params.id, body);
          res.status(201).json({ message: 'Product updated' });
     } catch (err) {
          next(err);
     }
};
