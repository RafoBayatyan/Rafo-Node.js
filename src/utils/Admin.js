import { getUserByEmailS } from '../api/users/users-servis.js';
import { User } from '../models/user-model.js';

const Admin = {
     firstName: 'Admin',
     lastName: 'Admin',
     password: 'Admin',
     email: 'gosh.hayrapetyan@gmail.com',
     isVerifiedEmail: true,
     isAdmine: true,
     age: 27,
     job: 'Ugeek',
};
const email = 'gosh.hayrapetyan@gmail.com';
export const creatAdmine = async () => {
     const admin = await getUserByEmailS(email);
     if (!admin) {
          new User(Admin).save();
     }
};
