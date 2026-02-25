import express from 'express';
import Facility from '../models/Facility.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Get facilities (based on role)
router.get('/', protect, async (req, res) => {
    try {
        let facilities;
        if (req.user.role === 'Admin') {
            facilities = await Facility.find({}).populate('bookedBy', 'name apartmentNumber').sort({ date: 1 });
        } else {
            facilities = await Facility.find({ bookedBy: req.user._id }).sort({ date: 1 });
        }
        res.json(facilities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Book a facility
router.post('/', protect, async (req, res) => {
    const { name, date, startTime, endTime } = req.body;

    try {
        // You could add conflict validation here (check if time overlaps)
        const newFacility = new Facility({
            name,
            date,
            startTime,
            endTime,
            bookedBy: req.user._id,
        });

        const savedFacility = await newFacility.save();
        res.status(201).json(savedFacility);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update facility status (Admin only)
router.put('/:id', protect, admin, async (req, res) => {
    const { status } = req.body;

    try {
        const facility = await Facility.findById(req.params.id);

        if (facility) {
            facility.status = status || facility.status;

            const updatedFacility = await facility.save();
            const populatedFacility = await Facility.findById(updatedFacility._id).populate('bookedBy', 'name apartmentNumber');

            res.json(populatedFacility);
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
