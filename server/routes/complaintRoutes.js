
const express = require('express');
const router = express.Router();
const {
    getAllComplaints,
    getMyComplaints,
    createComplaint,
    updateComplaintStatus
} = require('../controllers/complaintController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, authorize('admin', 'security'), getAllComplaints)
    .post(protect, authorize('resident'), createComplaint);

router.get('/my', protect, getMyComplaints);

router.route('/:id')
    .put(protect, authorize('admin', 'security'), updateComplaintStatus);

module.exports = router;
