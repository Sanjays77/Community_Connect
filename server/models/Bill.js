import mongoose from 'mongoose';

const billSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    month: { type: String, required: true },
    amount: { type: Number, required: true },
    status: {
        type: String,
        enum: ['Unpaid', 'Paid'],
        default: 'Unpaid'
    },
    paidAt: { type: Date }
}, { timestamps: true });

const Bill = mongoose.model('Bill', billSchema);
export default Bill;
