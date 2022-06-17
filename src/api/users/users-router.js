/* eslint-disable no-underscore-dangle */
import { resolve, dirname } from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
import { readFile, writeFile } from '../../utils/fs-promise.js';
import { validateUserData } from './user-validator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();
const filePath = resolve(__dirname, 'user.json');

const getUsers = async (path) => {
     const users = await readFile(path);
     return JSON.parse(users);
};

router.get('/', async (req, res) => {
     try {
          const users = await getUsers(filePath);
          res.status(200).send(JSON.stringify(users));
     } catch (err) {
          res.status(500).send(JSON.stringify({ message: err.message }));
     }
});

router.get('/:index', async (req, res) => {
     try {
          const i = Number(req.params.index);
          const users = await getUsers(filePath);
          res.status(200).send(JSON.stringify(users[i]));
     } catch (err) {
          res.status(500).send(JSON.stringify({ message: err.message }));
     }
});

router.delete('/:index', async (req, res) => {
     try {
          const index = Number(req.params.index);
          const users = await getUsers(filePath);
          if (index >= users.length) {
               throw new Error('User not exists');
          }
          const removedUser = users[index];
          const newUsers = users.filter((_, i) => i !== index);
          writeFile(filePath, JSON.stringify(newUsers));
          res.status(200).send(JSON.stringify(removedUser));
     } catch (err) {
          res.status(500).send(JSON.stringify({ message: err.message }));
     }
});

router.post('/', validateUserData, async (req, res) => {
     try {
          const users = await getUsers(filePath);
          const user = req.body;
          const isUniqueUser = users.find((u) => u.username === user.username);
          if (isUniqueUser) {
               throw new Error('User exists');
          }
          users.push(user);
          writeFile(filePath, JSON.stringify(users));
          res.status(201).send(JSON.stringify(req.body));
     } catch (err) {
          res.status(500).send(JSON.stringify({ message: err.message }));
     }
});

export default router;
