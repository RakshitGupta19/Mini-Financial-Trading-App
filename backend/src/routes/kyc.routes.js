import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import User from '../models/User.js';
import { auth } from '../middleware/auth.js';
import { fileURLToPath } from 'url';

const router = Router();

// store uploads in /server/uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, path.resolve('uploads')); },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname || '.png');
    cb(null, `${req.userId}-${Date.now()}${ext}`);
  }
});
const upload = multer({ storage });

router.post('/', auth, upload.single('idImage'), async (req, res) => {
  try {
    const { name, email, pan } = req.body;
    const idImagePath = req.file ? `/uploads/${req.file.filename}` : undefined;
    const user = await User.findByIdAndUpdate(
      req.userId,
      { $set: { kyc: { name, email, pan, idImagePath } } },
      { new: true }
    );
    res.json({ message: 'KYC saved', kyc: user.kyc });
  } catch {
    res.status(500).json({ message: 'KYC failed' });
  }
});

router.get('/', auth, async (req, res) => {
  const user = await User.findById(req.userId).select('kyc');
  res.json({ kyc: user?.kyc });
});

export default router;
