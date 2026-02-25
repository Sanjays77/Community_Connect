<<<<<<< HEAD
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
=======

const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema({
    resident: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    dueDate: { type: Date, required: true },
    status: { type: String, enum: ['unpaid', 'paid'], default: 'unpaid' },
    description: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bill', BillSchema);
>>>>>>> 8044050 (chore: add client and server folders)
