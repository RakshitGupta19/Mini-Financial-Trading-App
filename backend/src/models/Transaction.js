import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  units: { type: Number, required: true },
  priceAtBuy: { type: Number, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['BUY'], default: 'BUY' }
}, { timestamps: true });

export default mongoose.model('Transaction', TransactionSchema);
