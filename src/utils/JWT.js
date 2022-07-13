import 'dotenv/config';

import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;
export const sign = (data, expiresIn) => jwt.sign(data, JWT_SECRET, { expiresIn });

export const verify = (token) => jwt.verify(token, JWT_SECRET);
