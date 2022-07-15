import mongoose from 'mongoose';

const { Schema } = mongoose;

const ProductSchema = new Schema({
     videoGameName: {
          type: String,
          required: true,
     },
     platform: {
          type: String,
          required: true,
     },
     releaseDate: {
          type: Number,
          required: true,
     },
     productPriceInUSD: {
          type: Number,
          required: true,
     },

});
const Product = mongoose.model('products', ProductSchema);

export default Product;
