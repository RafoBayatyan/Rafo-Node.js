import mongoose from 'mongoose';

const { Schema } = mongoose;

const ProductSchema = new Schema({
     userId: mongoose.Schema.Types.ObjectId,
     productId: mongoose.Schema.Types.ObjectId,
     count: {
          type: Number,
          default: 1,
     },

});
const Bag = mongoose.model('bag-products', ProductSchema);
export default Bag;
