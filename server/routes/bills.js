import express from 'express';
import Bill from '../models/Bill.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Get resident's bills or all bills (Admin)
router.get('/', protect, async (req, res) => {
    try {
        let bills;
        if (req.user.role === 'Admin') {
            bills = await Bill.find({}).populate('user', 'name apartmentNumber email').sort({ createdAt: -1 });
        } else {
            bills = await Bill.find({ user: req.user._id }).sort({ createdAt: -1 });
        }
        res.json(bills);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a bill (Admin)
router.post('/', protect, admin, async (req, res) => {
    const { user, month, amount } = req.body;

    try {
        const bill = new Bill({
            user,
            month,
            amount
        });

        const createdBill = await bill.save();
        res.status(201).json(createdBill);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Mark bill as paid
router.put('/:id/pay', protect, async (req, res) => {
    try {
        const bill = await Bill.findById(req.params.id);

        if (bill && (bill.user.toString() === req.user._id.toString() || req.user.role === 'Admin')) {
            bill.status = 'Paid';
            bill.paidAt = Date.now();

            const updatedBill = await bill.save();
            res.json(updatedBill);
        } else {
            res.status(404).json({ message: 'Bill not found or unauthorized' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
