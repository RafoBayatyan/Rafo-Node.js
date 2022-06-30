import { User } from '../../models/user-model.js';

export const getUsersR = async () => User.find();
export const getUserR = async (id) => User.findById(id);
export const getUserByEmailR = async (email) => {
     console.log(email);
     return User.find({ email });
};
// export const deleteUserR = async (index) => {
//      const users = await getUsersF(filePath);

//      if (index >= users.length) throw new FactoryError(400, `${index}\` user`, 'User not a found');

//      const removedUser = users[index];
//      const newUsers = users.filter((_, i) => i !== index);

//      writeFile(filePath, JSON.stringify(newUsers, undefined, 2));

//      return removedUser;
// };
export const createUserR = async (user) => {
     const created = new User(user);
     await created.save();
     return created;
};
// export const updateUserR = async (index, user) => {
//      const users = await getUsersF(filePath);

//      if (index >= users.length) throw new FactoryError(404, `${index}\` user`, 'User not a found');

//      const currentUser = users[index];

//      Object.keys(user).forEach((prop) => {
//           if (currentUser.hasOwnProperty(prop)) {
//                currentUser[prop] = user[prop];
//           } else {
//                throw new FactoryError(404, prop, 'This property not a found');
//           }
//      });
//      writeFile(filePath, JSON.stringify(users, undefined, 2));
//      return users[index];
// };
