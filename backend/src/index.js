import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { connectDB } from './config/db.js';

import authRoutes from './routes/auth.routes.js';
import kycRoutes from './routes/kyc.routes.js';
import productRoutes from './routes/products.routes.js';
import txRoutes from './routes/transactions.routes.js';
import portfolioRoutes from './routes/portfolio.routes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// serve uploaded files
app.use('/uploads', express.static(path.resolve('uploads')));

app.get('/', (req, res) => res.send('Mini Trading API running'));

app.use('/api/auth', authRoutes);
app.use('/api/kyc', kycRoutes);
app.use('/api/products', productRoutes);
app.use('/api/tx', txRoutes);
app.use('/api/portfolio', portfolioRoutes);

const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
});
