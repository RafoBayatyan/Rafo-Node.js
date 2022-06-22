/* eslint-disable no-underscore-dangle */

import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { notExist } from '../../utils/Error/constants-error.js';
import { ControllerError } from '../../utils/Error/custom-error.js';
import { readFile, writeFile } from '../../utils/fs-promise.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = resolve(__dirname, 'products.json');

const getProducts = async (path) => {
     const product = await readFile(path);
     return JSON.parse(product);
};

export const getProductsC = async (req, res, next) => {
     try {
          const products = await getProducts(filePath);
          if (products.length === 0) {
               throw new ControllerError(406, notExist);
          }
          res.status(200).send(JSON.stringify(products));
     } catch (err) {
          next(err);
     }
};

export const getProductC = async (req, res, next) => {
     try {
          const i = req.params.index;
          const products = await getProducts(filePath);
          if (i >= products.length) {
               throw new ControllerError(406, notExist);
          }
          res.status(200).send(JSON.stringify(products[i]));
     } catch (err) {
          next(err);
     }
};

export const deleteProductsC = async (req, res, next) => {
     try {
          const index = Number(req.params.index);
          const products = await getProducts(filePath);
          if (index >= products.length) {
               throw new ControllerError(406, notExist);
          }
          const removedProduct = products[index];
          const newproducts = products.filter((_, i) => i !== index);
          writeFile(filePath, JSON.stringify(newproducts));
          res.status(200).send(JSON.stringify(removedProduct));
     } catch (err) {
          next(err);
     }
};

export const createProductsC = async (req, res) => {
     try {
          const products = await getProducts(filePath);
          const product = req.body;
          // const isUniqueUser = products.find((u) => u.username === product.username);
          // if (isUniqueUser) {
          //      throw new Error('Product exists');
          // }
          products.push(product);
          writeFile(filePath, JSON.stringify(products));
          return res.status(201).send(JSON.stringify(req.body));
     } catch (err) {
          return res.status(500).send(JSON.stringify({ message: err.message }));
     }
};
export const updateProductC = async (req, res, next) => {
     try {
          const products = await getProducts(filePath);
          const index = +req.params.index;
          if (index >= products.length) throw new ControllerError(404, 'User not a found');
          const updateProps = req.body;
          Object.keys(updateProps).forEach((prop) => {
               const product = products[index];
               if (prop in product) {
                    product[prop] = updateProps[prop];
               } else {
                    throw new ControllerError(406, 'This property not a found');
               }
          });
          writeFile(filePath, JSON.stringify(products));
          res.status(201).json(products[index]);
     } catch (err) {
          next(err);
     }
};
