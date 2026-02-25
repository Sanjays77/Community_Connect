
const Notice = require('../models/Notice');

// @desc    Get all notices
// @route   GET /api/notices
// @access  Private (All)
const getNotices = async (req, res) => {
    try {
        const notices = await Notice.find().sort({ createdAt: -1 }).populate('postedBy', 'name role');
        res.json(notices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a notice
// @route   POST /api/notices
// @access  Private (Admin only)
const createNotice = async (req, res) => {
    const { title, content } = req.body;

    try {
        const notice = new Notice({
            title,
            content,
            postedBy: req.user._id,
        });

        const createdNotice = await notice.save();
        res.status(201).json(createdNotice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a notice
// @route   DELETE /api/notices/:id
// @access  Private (Admin only)
const deleteNotice = async (req, res) => {
    try {
        const notice = await Notice.findById(req.params.id);

        if (notice) {
            await notice.remove();
            res.json({ message: 'Notice removed' });
        } else {
            res.status(404).json({ message: 'Notice not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getNotices,
    createNotice,
    deleteNotice,
};
