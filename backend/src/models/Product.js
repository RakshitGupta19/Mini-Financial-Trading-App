import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['STOCK', 'MUTUAL_FUND'], required: true },
  price: { type: Number, required: true },
  peRatio: { type: Number, required: true },
  description: String
}, { timestamps: true });

export default mongoose.model('Product', ProductSchema);
