/* eslint-disable no-prototype-builtins */
import { comparePassword, toHashPassword } from '../../utils/bcrypt.js';
import { ServerError } from '../../utils/custom-errors.js';
import {
     createUserR, getUsersR, getUserR, getUserByEmailR, deleteUserR, updateUserR,
} from './users-repository.js';

export const getUsersS = async () => getUsersR();

export const getUserS = async (id) => {
     const user = await getUserR(id);
     if (user == null) throw new ServerError(404, `${id}\` user`, 'User not a found');

     return user;
};

export const deleteUserS = async (id) => {
     const user = await getUserS(id);

     if (user == null) throw new ServerError(400, `${id}\` user`, 'User not a found');

     deleteUserR(id);
     return user;
};

export const getUserByEmailUnCheckS = async (email) => (await getUserByEmailR(email))[0];

export const getUserByEmailS = async (email) => {
     const got = getUserByEmailUnCheckS(email);

     if (!got) {
          throw new ServerError(400, `${email}\` user`, 'User not a found');
     }
     return got;
};

export const createUserS = async (user) => {
     const got = await getUserByEmailUnCheckS(user.email);
     console.log(got);
     if (got) throw new ServerError(400, user.email, 'Email is already exits');

     return createUserR({
          ...user,
          isVerifiedEmail: false,
          password: await toHashPassword(user.password),
     });
};

export const updateUserS = async (id, userUpd) => {
     await updateUserR(id, userUpd);
};
export const changePasswordS = async (body, id) => {
     const user = await getUserS(id);
     const { clientOldPassword, clientNewPassword } = body;
     const result = await comparePassword(clientOldPassword, user.password);
     if (!result) throw new ServerError(400, clientOldPassword, 'Password is not correct');
     const hashPassword = await toHashPassword(clientNewPassword);
     await updateUserS(id, { password: hashPassword });
};
