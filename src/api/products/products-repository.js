/* eslint-disable no-return-await */
/* eslint-disable max-len */
import Product from '../../models/product-model.js';

export const getProductsR = async () => Product.find();
export const getProductR = async (id) => Product.findById(id);
export const deleteProductR = async (id) => Product.deleteOne({ _id: id });
export const updateProductR = async (id, productUpd) => await Product.updateOne({ _id: id }, { $set: productUpd });
export const createProductR = async (product) => new Product(product).save();
