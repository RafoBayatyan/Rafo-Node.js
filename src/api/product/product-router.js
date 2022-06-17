/* eslint-disable no-underscore-dangle */
import { resolve, dirname } from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
import { readFile, writeFile } from '../../utils/fs-promise.js';
import { validateProductData } from './product-validator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = express.Router();
const filePath = resolve(__dirname, 'product.json');

const getUsers = async (path) => {
     const product = await readFile(path);
     return JSON.parse(product);
};

router.get('/', async (req, res) => {
     try {
          const product = await getUsers(filePath);
          res.status(200).send(JSON.stringify(product));
     } catch (err) {
          res.status(500).send(JSON.stringify({ message: err.message }));
     }
});

router.get('/:index', async (req, res) => {
     try {
          const i = Number(req.params.index);
          const product = await getUsers(filePath);
          res.status(200).send(JSON.stringify(product[i]));
     } catch (err) {
          res.status(500).send(JSON.stringify({ message: err.message }));
     }
});

router.delete('/:index', async (req, res) => {
     try {
          const index = Number(req.params.index);
          const product = await getUsers(filePath);
          if (index >= product.length) {
               throw new Error('User not exists');
          }
          const removedUser = product[index];
          const newUsers = product.filter((_, i) => i !== index);
          writeFile(filePath, JSON.stringify(newUsers));
          res.status(200).send(JSON.stringify(removedUser));
     } catch (err) {
          res.status(500).send(JSON.stringify({ message: err.message }));
     }
});

router.post('/', validateProductData, async (req, res) => {
     try {
          const product = await getUsers(filePath);
          const prod = req.body;
          const isUniqueUser = product.find((u) => u.username === prod.username);
          if (isUniqueUser) {
               throw new Error('User exists');
          }

          product.push(prod);
          writeFile(filePath, JSON.stringify(product));
          res.status(201).send(JSON.stringify(req.body));
     } catch (err) {
          res.status(500).send(JSON.stringify({ message: err.message }));
     }
});

export default router;
