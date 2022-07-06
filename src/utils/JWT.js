import jwt from 'jsonwebtoken';

const secret = 'strong';
export const sign = (data, expiresIn) => jwt.sign(data, secret, { expiresIn });