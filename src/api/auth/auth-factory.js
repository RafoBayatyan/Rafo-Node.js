/* eslint-disable import/named */
import { FactoryError } from '../../utils/custom-errors.js';
import { sign } from '../../utils/JWT.js';
import { createUserF, getUserByEmailF } from '../users/users-factory.js';

export const signinF = async (user) => {
     const { email, password } = user;
     const got = await getUserByEmailF(email);
     if (!got) throw new FactoryError(400, '', 'Email or password is not correct');

     if (password !== got.password) throw new FactoryError(400, '', 'Email or password is not correct');

     const token = sign({ id: got.id }, '1h');
     return token;
};

export const signupF = async (user) => createUserF(user);
