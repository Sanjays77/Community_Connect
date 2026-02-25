
const express = require('express');
const router = express.Router();
const {
    getAllBills,
    getMyBills,
    createBill,
    markBillPaid
} = require('../controllers/billController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', protect, authorize('admin'), getAllBills);
router.get('/my', protect, getMyBills);
router.post('/', protect, authorize('admin'), createBill);
router.put('/:id/pay', protect, authorize('admin'), markBillPaid);

module.exports = router;
