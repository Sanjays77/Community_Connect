import express from 'express';
import Notice from '../models/Notice.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Get all notices
router.get('/', async (req, res) => {
    try {
        const notices = await Notice.find({}).populate('author', 'name email').sort({ createdAt: -1 });
        res.json(notices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create notice
router.post('/', protect, admin, async (req, res) => {
    const { title, content } = req.body;

    try {
        const notice = new Notice({
            title,
            content,
            author: req.user._id,
        });

        const createdNotice = await notice.save();
        const populatedNotice = await Notice.findById(createdNotice._id).populate('author', 'name email');

        // Emit socket event
        const io = req.app.get('io');
        if (io) {
            io.emit('newNotice', populatedNotice);
        }

        res.status(201).json(populatedNotice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update notice
router.put('/:id', protect, admin, async (req, res) => {
    const { title, content } = req.body;

    try {
        const notice = await Notice.findById(req.params.id);

        if (notice) {
            notice.title = title || notice.title;
            notice.content = content || notice.content;

            const updatedNotice = await notice.save();
            const populatedNotice = await Notice.findById(updatedNotice._id).populate('author', 'name email');

            // Emit socket event (could create an 'updateNotice' event if frontend listens)
            const io = req.app.get('io');
            if (io) {
                io.emit('noticeUpdated', populatedNotice);
            }

            res.json(populatedNotice);
        } else {
            res.status(404).json({ message: 'Notice not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete notice
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const notice = await Notice.findById(req.params.id);

        if (notice) {
            await Notice.deleteOne({ _id: notice._id });

            // Emit socket event
            const io = req.app.get('io');
            if (io) {
                io.emit('noticeDeleted', notice._id);
            }

            res.json({ message: 'Notice removed' });
        } else {
            res.status(404).json({ message: 'Notice not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
