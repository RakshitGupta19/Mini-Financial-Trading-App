import { Router } from 'express';
import Transaction from '../models/Transaction.js';
import Product from '../models/Product.js';
import { auth } from '../middleware/auth.js';

const router = Router();

router.get('/me', auth, async (req, res) => {
  const tx = await Transaction.find({ user: req.userId }).populate('product');

  const holdings = {};
  let invested = 0;

  for (const t of tx) {
    const pid = String(t.product._id);
    if (!holdings[pid]) holdings[pid] = { product: t.product, units: 0, invested: 0, current: 0 };
    holdings[pid].units += t.units;
    holdings[pid].invested += t.amount;
    invested += t.amount;
  }

  let current = 0;
  for (const pid of Object.keys(holdings)) {
    const p = await Product.findById(pid);
    const cur = holdings[pid].units * p.price;
    holdings[pid].current = cur;
    current += cur;
  }

  const returns = current - invested;
  res.json({ invested, current, returns, positions: Object.values(holdings) });
});

export default router;
