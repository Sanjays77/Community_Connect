
const Complaint = require('../models/Complaint');

// @desc    Get all complaints
// @route   GET /api/complaints
// @access  Private (Admin/Security)
const getAllComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find().sort({ createdAt: -1 }).populate('raisedBy', 'name flatNumber');
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user complaints
// @route   GET /api/complaints/my
// @access  Private (Resident)
const getMyComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find({ raisedBy: req.user._id }).sort({ createdAt: -1 });
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a complaint
// @route   POST /api/complaints
// @access  Private (Resident)
const createComplaint = async (req, res) => {
    const { title, description } = req.body;

    try {
        const complaint = new Complaint({
            title,
            description,
            raisedBy: req.user._id,
        });

        const createdComplaint = await complaint.save();
        res.status(201).json(createdComplaint);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update complaint status
// @route   PUT /api/complaints/:id
// @access  Private (Admin/Security)
const updateComplaintStatus = async (req, res) => {
    const { status, response } = req.body;

    try {
        const complaint = await Complaint.findById(req.params.id);

        if (complaint) {
            complaint.status = status || complaint.status;
            complaint.response = response || complaint.response;
            complaint.updatedAt = Date.now();

            const updatedComplaint = await complaint.save();
            res.json(updatedComplaint);
        } else {
            res.status(404).json({ message: 'Complaint not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllComplaints,
    getMyComplaints,
    createComplaint,
    updateComplaintStatus,
};
