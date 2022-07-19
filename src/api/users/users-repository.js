import UserAdditional from '../../models/user-additional-model.js';
import User from '../../models/user-model.js';

export const getUsersR = async () => User.find();
export const getUserR = async (id) => User.findById(id).populate('additional');
export const getUserByEmailR = async (email) => User.find({ email });
export const deleteUserR = async (id) => User.remove({ _id: id });
export const updateUserR = async (id, userUpd) => User.updateOne({ _id: id }, { $set: userUpd });
export const createUserR = async (user) => {
     const {

          firstName, lastName, age, email, password, ...userAddition
     } = user;
     const userAdditional = new UserAdditional(userAddition);
     await userAdditional.save();
     const userObject = {
          firstName, lastName, age, email, password, additional: userAdditional._id,
     };
     console.log(userObject);
     return new User(userObject).save();
};
