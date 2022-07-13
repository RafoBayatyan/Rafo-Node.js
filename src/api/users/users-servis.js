/* eslint-disable no-prototype-builtins */
import { toHashPassword } from '../../utils/bcrypt.js';
import { ServisError } from '../../utils/custom-errors.js';
import {
     createUserR, getUsersR, getUserR, getUserByEmailR, deleteUserR, updateUserR,
} from './users-repository.js';

export const getUsersS = async () => getUsersR();

export const getUserS = async (id) => {
     const user = await getUserR(id);
     if (user == null) throw new ServisError(404, `${id}\` user`, 'User not a found');

     return user;
};

export const deleteUserS = async (id) => {
     const user = await getUserS(id);

     if (user == null) throw new ServisError(400, `${id}\` user`, 'User not a found');

     deleteUserR(id);
     return user;
};

export const getUserByEmailS = async (email) => {
     const got = (await getUserByEmailR(email))[0];

     if (!got) {
          throw new ServisError(400, `${email}\` user`, 'User not a found');
     }
     return got;
};

export const createUserS = async (user) => {
     const got = (await getUserByEmailR(user.email))[0];

     if (got) throw new ServisError(400, user.email, 'Email is already exits');

     return createUserR({
          ...user,
          isVerifiedEmail: false,
          password: await toHashPassword(user.password),
     });
};

export const updateUserS = async (id, userUpd) => {
     await updateUserR(id, userUpd);
};
