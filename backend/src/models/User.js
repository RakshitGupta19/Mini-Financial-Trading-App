import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const KYCSchema = new mongoose.Schema({
    name: String,
    email: String,
    pan: String,
    idImagePath: String,
    submittedAt: { type: Date, default: Date.now }
}, { _id: false });

const WalletSchema = new mongoose.Schema({
    balance: { type: Number, default: 100000 }
}, { _id: false });

const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true, index: true },
    password: { type: String, required: true },
    kyc: KYCSchema,
    watchlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    wallet: { type: WalletSchema, default: () => ({}) }
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.comparePassword = function (plain) {
    return bcrypt.compare(plain, this.password);
};

export default mongoose.model('User', UserSchema);
