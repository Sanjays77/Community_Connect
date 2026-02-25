
const express = require('express');
const router = express.Router();
const { getNotices, createNotice, deleteNotice } = require('../controllers/noticeController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getNotices)
    .post(protect, authorize('admin'), createNotice);

router.route('/:id')
    .delete(protect, authorize('admin'), deleteNotice);

module.exports = router;
