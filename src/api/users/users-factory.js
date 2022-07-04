/* eslint-disable no-prototype-builtins */
import { FactoryError } from '../../utils/custom-errors.js';
import {
     createUserR, getUsersR, getUserR, getUserByEmailR, deleteUserR, updateUserR,
} from './users-repository.js';

export const getUsersF = async () => getUsersR();

export const getUserF = async (id) => {
     const user = await getUserR(id);
     if (user == null) throw new FactoryError(404, `${id}\` user`, 'User not a found');

     return user;
};

export const deleteUserF = async (id) => {
     const user = await getUserF(id);

     deleteUserR(id);
     return user;
};

export const createUserF = async (user) => {
     const got = (await getUserByEmailR(user.email))[0];
     if (got) throw new FactoryError(400, user.email, 'Email is already exits');

     createUserR(user);
};

export const updateUserF = async (id, userUpd) => {
     const user = await getUserF(id);
     Object.assign(user, userUpd);
     updateUserR(user);
};
