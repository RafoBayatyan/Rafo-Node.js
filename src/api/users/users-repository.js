import { User } from '../../models/user-model.js';

export const getUsersR = async () => User.find();
export const getUserR = async (id) => User.findById(id);
export const getUserByEmailR = async (email) => {
     console.log(email);
     return User.find({ email });
};
export const deleteUserR = async (id) => {
     await User.remove({ _id: id });
};
export const createUserR = async (user) => {
     const created = new User(user);
     await created.save();
     return created;
};
export const updateUserR = async (user) => {
     await user.save();
};
