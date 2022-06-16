import { resolve } from 'path';
import express from 'express';
import { readFile, writeFile } from '../../utils/fs-promise.js';

const router = express.Router();
const filePath = resolve('product.json');

const chackName = (prod) => {
     const prodName = prod.name;
     if (prodName.length < 4) {
          throw new Error('Product Name must be have 4 letter');
     }
     if (!(prodName[0] >= 'A' && prodName[0] <= 'Z')) {
          throw new Error('first letter must be started whit a capital letter');
     }
     // eslint-disable-next-line no-plusplus
     for (let i = 1; i < prodName.length; i++) {
          if (!(prodName[i] >= 'a' && prodName[i] <= 'z')) {
               throw new Error('The word must contain only letters ');
          }
     }
};
const chackColor = (prod) => {
     const { color } = prod;
     if (color.length < 4) {
          throw new Error('color must be have 4 letter');
     }
     if (!(color[0] >= 'A' && color[0] <= 'Z')) {
          throw new Error('first letter must be started whit a capital letter');
     }

     // eslint-disable-next-line no-plusplus
     for (let i = 1; i < color.length; i++) {
          if (!(color[i] >= 'a' && color[i] <= 'z')) {
               throw new Error('The word must contain only letters ');
          }
     }
};
const chakCameras = (prod) => {
     const { fCamera } = prod;
     const { bCamera } = prod;
     if (fCamera < 0 && parseFloat(fCamera)) {
          throw new Error('Camera');
     }
     if (bCamera < 0 && parseFloat(bCamera)) {
          throw new Error('Camera');
     }
};

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

router.post('/', async (req, res) => {
     try {
          console.log(('hgdhg'));
          const product = await getUsers(filePath);
          const prod = req.body;
          const isUniqueUser = product.find((u) => u.username === prod.username);
          if (isUniqueUser) {
               throw new Error('User exists');
          }
          await chackName(prod);
          await chakCameras(prod);
          await chackColor(prod);
          product.push(prod);
          writeFile(filePath, JSON.stringify(product));
          res.status(201).send(JSON.stringify(req.body));
     } catch (err) {
          res.status(500).send(JSON.stringify({ message: err.message }));
     }
});

export default router;
