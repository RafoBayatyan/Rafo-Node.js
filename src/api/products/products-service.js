/* eslint-disable no-prototype-builtins */
import { ServerError } from '../../utils/custom-errors.js';
import {
     createProductR, getProductsR, getProductR, deleteProductR, updateProductR,
} from './products-repository.js';

export const getProductsS = async () => getProductsR();

export const getProductS = async (id) => {
     const product = await getProductR(id);
     if (product == null) throw new ServerError(404, `${id}\` product`, 'Product not a found');

     return product;
};

export const deleteProductS = async (id) => {
     const product = await getProductS(id);

     if (product == null) throw new ServerError(400, `${id}\` product`, 'Product not a found');

     deleteProductR(id);
     return product;
};

export const createProductS = async (product) => {
     createProductR(product);
};

export const updateProductS = async (id, productUpd) => {
     console.log(productUpd, id);
     await updateProductR(id, productUpd);
};
