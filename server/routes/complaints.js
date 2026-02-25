import express from 'express';
import Complaint from '../models/Complaint.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Get user complaints or all if Admin/Security
router.get('/', protect, async (req, res) => {
    try {
        let complaints;
        if (req.user.role === 'Admin' || req.user.role === 'Security') {
            complaints = await Complaint.find({}).populate('author', 'name apartmentNumber').sort({ createdAt: -1 });
        } else {
            complaints = await Complaint.find({ author: req.user._id }).populate('author', 'name apartmentNumber').sort({ createdAt: -1 });
        }
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create complaint
router.post('/', protect, async (req, res) => {
    const { title, description } = req.body;

    try {
        const complaint = new Complaint({
            title,
            description,
            author: req.user._id,
        });

        const createdComplaint = await complaint.save();
        const populatedComplaint = await Complaint.findById(createdComplaint._id).populate('author', 'name apartmentNumber');

        // Emit socket event to notify admins
        const io = req.app.get('io');
        if (io) {
            io.emit('newComplaint', populatedComplaint);
        }

        res.status(201).json(populatedComplaint);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update complaint status (Admin/Security)
router.put('/:id', protect, admin, async (req, res) => {
    const { status, adminResponse } = req.body;

    try {
        const complaint = await Complaint.findById(req.params.id);

        if (complaint) {
            complaint.status = status || complaint.status;
            complaint.adminResponse = adminResponse || complaint.adminResponse;

            const updatedComplaint = await complaint.save();
            const populatedComplaint = await Complaint.findById(updatedComplaint._id).populate('author', 'name apartmentNumber');

            // Emit socket event
            const io = req.app.get('io');
            if (io) {
                // Emit event to all users for now, or you could do it to specific user if you managed rooms
                io.emit('complaintStatusUpdated', populatedComplaint);
            }

            res.json(populatedComplaint);
        } else {
            res.status(404).json({ message: 'Complaint not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Rate complaint resolution (Resident)
router.put('/:id/rate', protect, async (req, res) => {
    const { rating, feedback } = req.body;

    try {
        const complaint = await Complaint.findById(req.params.id);

        if (complaint && complaint.author.toString() === req.user._id.toString()) {
            if (complaint.status !== 'Resolved') {
                return res.status(400).json({ message: 'Complaint must be resolved to rate' });
            }

            complaint.rating = rating;
            complaint.feedback = feedback;

            const updatedComplaint = await complaint.save();
            const populatedComplaint = await Complaint.findById(updatedComplaint._id).populate('author', 'name apartmentNumber');

            // Emit socket event
            const io = req.app.get('io');
            if (io) {
                io.emit('complaintStatusUpdated', populatedComplaint);
            }

            res.json(populatedComplaint);
        } else {
            res.status(404).json({ message: 'Complaint not found or unauthorized' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
