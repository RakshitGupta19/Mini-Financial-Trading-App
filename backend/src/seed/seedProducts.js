import 'dotenv/config';
import { connectDB } from '../config/db.js';
import Product from '../models/Product.js';

const products = [
  { name: 'ACME Corp', category: 'STOCK', price: 1200, peRatio: 22.5, description: 'Blue-chip industrial' },
  { name: 'Beta Bank', category: 'STOCK', price: 560, peRatio: 18.1, description: 'Large cap bank' },
  { name: 'Gamma Tech', category: 'STOCK', price: 2450, peRatio: 35.2, description: 'High growth tech' },
  { name: 'Alpha Equity Fund', category: 'MUTUAL_FUND', price: 180, peRatio: 0, description: 'Diversified equity MF' },
  { name: 'Stability Debt Fund', category: 'MUTUAL_FUND', price: 105, peRatio: 0, description: 'Short-duration debt MF' }
];

async function run() {
  await connectDB(process.env.MONGO_URI);
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('Seeded products');
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
