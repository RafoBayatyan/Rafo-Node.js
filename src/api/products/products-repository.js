/* eslint-disable no-return-await */
/* eslint-disable max-len */
import Product from '../../models/product-model.js';

export const getProductsR = async () => Product.find();
export const getProductR = async (id) => Product.findById(id);
export const deleteProductR = async (id) => Product.remove({ _id: id });
export const updateProductR = async (id, userUpd) => await Product.updateOne({ _id: id }, { $set: userUpd });
export const createProductR = async (user) => new Product(user).save();
