/* eslint-disable no-underscore-dangle */

import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFile, writeFile } from '../../utils/fs-promise.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = resolve(__dirname, 'products.json');

const getProducts = async (path) => {
     const product = await readFile(path);
     return JSON.parse(product);
};

export const getProductsC = async (req, res) => {
     try {
          const products = await getProducts(filePath);
          res.status(200).send(JSON.stringify(products));
     } catch (err) {
          res.status(500).send(JSON.stringify({ message: err.message }));
     }
};

export const getProductC = async (req, res) => {
     try {
          const i = req.params.index;
          const products = await getProducts(filePath);
          res.status(200).send(JSON.stringify(products[i]));
     } catch (err) {
          res.status(500).send(JSON.stringify({ message: err.message }));
     }
};

export const deleteProductsC = async (req, res) => {
     try {
          const index = Number(req.params.index);
          const products = await getProducts(filePath);
          if (index >= products.length) {
               throw new Error('User not exists');
          }
          const removedProduct = products[index];
          const newproducts = products.filter((_, i) => i !== index);
          writeFile(filePath, JSON.stringify(newproducts));
          res.status(200).send(JSON.stringify(removedProduct));
     } catch (err) {
          res.status(500).send(JSON.stringify({ message: err.message }));
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
