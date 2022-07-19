import Bag from '../../models/product-bag-model.js';

export const getUserBagR = async (id) => Bag.find({ id });
export const addToOldBagR = async (id, prodUpd) => Bag.updateOne({ _id: id }, { $set: prodUpd });
export const createBagR = async (userId, productId) => new Bag({ userId, productId }).save();
