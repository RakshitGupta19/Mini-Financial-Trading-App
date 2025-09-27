import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { auth } from "../middleware/auth.js";

const router = Router();

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'email & password required' });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already registered' });

    const user = new User({ email, password });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2d' });
    res.json({ token, user: { id: user._id, email: user.email, wallet: user.wallet } });
  } catch {
    res.status(500).json({ message: 'Signup failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const ok = await user.comparePassword(password);
    if (!ok) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2d' });
    res.json({ token, user: { id: user._id, email: user.email, wallet: user.wallet } });
  } catch {
    res.status(500).json({ message: 'Login failed' });
  }
});

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.userId).select('email wallet');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ email: user.email, wallet: user.wallet });
});


export default router;
