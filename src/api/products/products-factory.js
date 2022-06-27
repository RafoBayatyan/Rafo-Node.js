/* eslint-disable no-prototype-builtins */
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { notExist } from '../../constants.js/constants-error.js';
import { FactoryError } from '../../utils/custom-errors.js';
import { readFile, writeFile } from '../../utils/fs-promise.js';

const __fileName = fileURLToPath(import.meta.url);
const __dirName = dirname(__fileName);
const filePath = resolve(__dirName, 'Products.json');

export const getProductsF = async () => {
     let Products = await readFile(filePath);
     Products = JSON.parse(Products);
     return Products;
};

export const getProductF = async (index) => {
     const products = await getProductsF(filePath);
     if (index >= products.length) throw new FactoryError(406, notExist);

     return products[index];
};
export const deleteProductF = async (index) => {
     const products = await getProductsF(filePath);

     if (index >= products.length) throw new FactoryError(406, notExist);

     const removedProduct = products[index];
     const newProducts = products.filter((_, i) => i !== index);

     writeFile(filePath, JSON.stringify(newProducts, undefined, 2));

     return removedProduct;
};
export const createProductF = async (product) => {
     const products = await getProductsF(filePath);

     const isUniqueProduct = products.find((u) => u.productName === product.productName);

     if (!isUniqueProduct) {
          throw new FactoryError(400, 'Product exists');
     }

     products.push(product);
     writeFile(filePath, JSON.stringify(products, undefined, 2));
     return product;
};
export const updateProductF = async (index, product) => {
     const products = await getProductsF(filePath);

     if (index >= products.length) throw new FactoryError(404, 'User not a found');

     const currentProduct = products[index];

     Object.keys(product).forEach((prop) => {
          if (currentProduct.hasOwnProperty(prop)) {
               currentProduct[prop] = product[prop];
          } else {
               throw new FactoryError(404, 'This property not a found');
          }
     });
     writeFile(filePath, JSON.stringify(products, undefined, 2));
     return products[index];
};
