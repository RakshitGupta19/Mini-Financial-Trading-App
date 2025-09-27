import { Router } from 'express';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Transaction from '../models/Transaction.js';
import { auth } from '../middleware/auth.js';

const router = Router();

router.post('/buy', auth, async (req, res) => {
  try {
    const { productId, units } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const qty = Number(units || 0);
    if (qty <= 0) return res.status(400).json({ message: 'Units must be > 0' });

    const amount = product.price * qty;
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.wallet.balance < amount) return res.status(400).json({ message: 'Insufficient balance' });

    user.wallet.balance -= amount;
    await user.save();

    const tx = await Transaction.create({
      user: user._id,
      product: product._id,
      units: qty,
      priceAtBuy: product.price,
      amount
    });

    res.json({ message: 'Purchase successful', wallet: user.wallet, tx });
  } catch (e) {
    console.error('BUY ERROR:', e);
    res.status(500).json({ message: 'Buy failed' });
  }
});


router.get('/me', auth, async (req, res) => {
  const tx = await Transaction.find({ user: req.userId }).populate('product');
  res.json(tx);
});

export default router;
