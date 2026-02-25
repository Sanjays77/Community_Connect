import express from 'express';
import Visitor from '../models/Visitor.js';
import { protect, adminOrSecurity } from '../middleware/auth.js';

const router = express.Router();

// Get visitors (All for Security/Admin, only specific apartment for Resident)
router.get('/', protect, async (req, res) => {
    try {
        let visitors;
        if (req.user.role === 'Admin' || req.user.role === 'Security') {
            visitors = await Visitor.find({}).sort({ createdAt: -1 });
        } else {
            visitors = await Visitor.find({ hostApartment: req.user.apartmentNumber }).sort({ createdAt: -1 });
        }
        res.json(visitors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create visitor (Security adds visitor, or Resident pre-approves)
router.post('/', protect, async (req, res) => {
    const { name, phone, purpose, hostApartment } = req.body;
    try {
        const visitor = new Visitor({
            name,
            phone,
            purpose,
            hostApartment,
            recordedBy: req.user._id,
            status: req.user.role === 'Resident' ? 'Approved' : 'Pending'
        });
        const createdVisitor = await visitor.save();
        res.status(201).json(createdVisitor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update status (Admin/Security/Resident)
router.put('/:id', protect, async (req, res) => {
    const { status } = req.body;
    try {
        const visitor = await Visitor.findById(req.params.id);
        if (!visitor) return res.status(404).json({ message: 'Visitor not found' });

        // Simplistic auth check (Ideally we'd check if Resident owns apartment for specific statuses)
        visitor.status = status;
        if (status === 'Checked In') visitor.enteredAt = Date.now();
        if (status === 'Checked Out') visitor.exitedAt = Date.now();

        const updated = await visitor.save();
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
