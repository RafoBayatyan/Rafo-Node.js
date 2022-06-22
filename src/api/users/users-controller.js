/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */

import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { notExist } from '../../utils/Error/constants-error.js';
import { ControllerError } from '../../utils/Error/custom-error.js';
import { readFile, writeFile } from '../../utils/fs-promise.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = resolve(__dirname, 'users.json');

const getUsers = async (path) => {
     const users = await readFile(path);
     return JSON.parse(users);
};

export const getUsersC = async (req, res, next) => {
     try {
          const users = await getUsers(filePath);

          if (users.length === 0) {
               throw new ControllerError(406, notExist);
          }
          res.status(200).send(JSON.stringify(users));
     } catch (err) {
          next(err);
     }
};

export const getUserC = async (req, res, next) => {
     try {
          const i = req.params.index;
          const users = await getUsers(filePath);
          if (i >= users.length) {
               throw new ControllerError(406, notExist);
          }
          res.status(200).send(JSON.stringify(users[i]));
     } catch (err) {
          next(err);
     }
};

export const deleteUserC = async (req, res, next) => {
     try {
          const index = Number(req.params.index);
          const users = await getUsers(filePath);
          if (index >= users.length) {
               throw new ControllerError(406, notExist);
          }
          const removedUser = users[index];
          const newUsers = users.filter((_, i) => i !== index);
          writeFile(filePath, JSON.stringify(newUsers));
          res.status(200).send(JSON.stringify(removedUser));
     } catch (err) {
          next(err);
     }
};

export const createUserC = async (req, res, next) => {
     try {
          const users = await getUsers(filePath);
          const user = req.body;
          const isUniqueUser = users.find((u) => u.username === user.username);
          if (isUniqueUser) {
               throw new ControllerError(406, notExist);
          }
          users.push(user);
          writeFile(filePath, JSON.stringify(users));
          return res.status(201).send(JSON.stringify(req.body));
     } catch (err) {
          next(err);
     }
};

export const updateUserC = async (req, res, next) => {
     try {
          const users = await getUsers(filePath);
          const index = +req.params.index;
          if (index >= users.length) throw new ControllerError(404, 'User not a found');
          const updateProps = req.body;
          Object.keys(updateProps).forEach((prop) => {
               const user = users[index];
               if (prop in user) {
                    user[prop] = updateProps[prop];
               } else {
                    throw new ControllerError(406, 'This property not a found');
               }
          });
          writeFile(filePath, JSON.stringify(users));
          res.status(201).json(users[index]);
     } catch (err) {
          next(err);
     }
};
