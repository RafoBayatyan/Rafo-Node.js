import { hash, genSalt, compare } from 'bcrypt';
import 'dotenv/config';

export const toHashPassword = async (password) => {
     const salt = await genSalt(+process.env.SALT);
     return hash(password, salt);
};

export const comparePassword = async (password, hashPassword) => compare(password, hashPassword);
