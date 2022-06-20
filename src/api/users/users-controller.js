/* eslint-disable no-underscore-dangle */

import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFile, writeFile } from '../../utils/fs-promise.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = resolve(__dirname, 'users.json');

const getUsers = async (path) => {
     const users = await readFile(path);
     return JSON.parse(users);
};

export const getUsersC = async (req, res) => {
     try {
          const users = await getUsers(filePath);
          res.status(200).send(JSON.stringify(users));
     } catch (err) {
          res.status(500).send(JSON.stringify({ message: err.message }));
     }
};

export const getUserC = async (req, res) => {
     try {
          const i = req.params.index;
          const users = await getUsers(filePath);
          res.status(200).send(JSON.stringify(users[i]));
     } catch (err) {
          res.status(500).send(JSON.stringify({ message: err.message }));
     }
};

export const deleteUserC = async (req, res) => {
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
};

export const createUserC = async (req, res) => {
     try {
          const users = await getUsers(filePath);
          const user = req.body;
          const isUniqueUser = users.find((u) => u.username === user.username);
          if (isUniqueUser) {
               throw new Error('User exists');
          }
          users.push(user);
          writeFile(filePath, JSON.stringify(users));
          return res.status(201).send(JSON.stringify(req.body));
     } catch (err) {
          return res.status(500).send(JSON.stringify({ message: err.message }));
     }
};
