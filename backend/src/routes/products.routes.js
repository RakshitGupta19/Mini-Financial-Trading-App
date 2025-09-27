import { Router } from 'express';
import Product from '../models/Product.js';
import User from '../models/User.js';
import { auth } from '../middleware/auth.js';

const router = Router();

// Watchlist routes FIRST to avoid conflict with /:id
router.get('/me/watchlist', auth, async (req, res) => {
  const user = await User.findById(req.userId).populate('watchlist');
  res.json(user?.watchlist || []);
});

router.post('/:id/watch', auth, async (req, res) => {
  await User.findByIdAndUpdate(req.userId, { $addToSet: { watchlist: req.params.id } });
  res.json({ message: 'Added to watchlist' });
});

router.delete('/:id/watch', auth, async (req, res) => {
  await User.findByIdAndUpdate(req.userId, { $pull: { watchlist: req.params.id } });
  res.json({ message: 'Removed from watchlist' });
});

// Products
router.get('/', async (req, res) => {
  const items = await Product.find().sort({ createdAt: -1 });
  res.json(items);
});

router.get('/:id', async (req, res) => {
  const item = await Product.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  const history = Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    price: Math.round(item.price * (0.9 + Math.random() * 0.2))
  }));
  res.json({ ...item.toObject(), history });
});

export default router;
