/* eslint-disable no-prototype-builtins */
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { notExist } from '../../constants.js/constants-error.js';
import { FactoryError } from '../../utils/custom-errors.js';
import { readFile, writeFile } from '../../utils/fs-promise.js';

const __fileName = fileURLToPath(import.meta.url);
const __dirName = dirname(__fileName);
const filePath = resolve(__dirName, 'users.json');

export const getUsersF = async () => {
     let users = await readFile(filePath);
     users = JSON.parse(users);
     return users;
};

export const getUserF = async (index) => {
     const users = await getUsersF(filePath);
     if (index >= users.length) throw new FactoryError(406, notExist);

     return users[index];
};
export const deleteUserF = async (index) => {
     const users = await getUsersF(filePath);

     if (index >= users.length) throw new FactoryError(406, notExist);

     const removedUser = users[index];
     const newUsers = users.filter((_, i) => i !== index);

     writeFile(filePath, JSON.stringify(newUsers, undefined, 2));

     return removedUser;
};
export const createUserF = async (user) => {
     const users = await getUsersF(filePath);

     const isUniqueUser = users.find((u) => u.username === user.username);

     if (isUniqueUser) throw new FactoryError(406, notExist);

     users.push(user);
     writeFile(filePath, JSON.stringify(users, undefined, 2));
     return user;
};
export const updateUserF = async (index, user) => {
     const users = await getUsersF(filePath);

     if (index >= users.length) throw new FactoryError(404, 'User not a found');

     const currentUser = users[index];

     Object.keys(user).forEach((prop) => {
          if (currentUser.hasOwnProperty(prop)) {
               currentUser[prop] = user[prop];
          } else {
               throw new FactoryError(406, 'This property not a found');
          }
     });
     writeFile(filePath, JSON.stringify(users, undefined, 2));
     return users[index];
};
