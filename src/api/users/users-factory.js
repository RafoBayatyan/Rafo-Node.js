/* eslint-disable no-prototype-builtins */
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { FactoryError } from '../../utils/custom-errors.js';
import { writeFile } from '../../utils/fs-promise.js';
import {
     createUserR, getUsersR, getUserR, getUserByEmailR,
} from './users-repository.js';

const __fileName = fileURLToPath(import.meta.url);
const __dirName = dirname(__fileName);
const filePath = resolve(__dirName, 'users.json');

export const getUsersF = async () => getUsersR();

export const getUserF = async (id) => {
     const user = await getUserR(id);
     if (user == null) throw new FactoryError(404, `${id}\` user`, 'User not a found');

     return user;
};

export const deleteUserF = async (id) => {
     

};

export const createUserF = async (user) => {
     const got = (await getUserByEmailR(user.email))[0];
     console.log(got);
     if (got) throw new FactoryError(400, user.email, 'Email is already exits');

     createUserR(user);
};

export const updateUserF = async (index, user) => {
     const users = await getUsersF(filePath);

     if (index >= users.length) throw new FactoryError(404, `${index}\` user`, 'User not a found');

     const currentUser = users[index];

     Object.keys(user).forEach((prop) => {
          if (currentUser.hasOwnProperty(prop)) {
               currentUser[prop] = user[prop];
          } else {
               throw new FactoryError(404, prop, 'This property not a found');
          }
     });
     writeFile(filePath, JSON.stringify(users, undefined, 2));
     return users[index];
};
