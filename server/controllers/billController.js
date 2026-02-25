
const Bill = require('../models/Bill');

// @desc    Get all bills (Admin view)
// @route   GET /api/bills/all
// @access  Private (Admin)
const getAllBills = async (req, res) => {
    try {
        const bills = await Bill.find().populate('resident', 'name flatNumber');
        res.json(bills);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get my bills (Resident view)
// @route   GET /api/bills/my
// @access  Private (Resident)
const getMyBills = async (req, res) => {
    try {
        const bills = await Bill.find({ resident: req.user._id }).sort({ dueDate: 1 });
        res.json(bills);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a bill (Admin)
// @route   POST /api/bills
// @access  Private (Admin)
const createBill = async (req, res) => {
    const { residentId, amount, dueDate, description } = req.body;

    try {
        const bill = new Bill({
            resident: residentId,
            amount,
            dueDate,
            description,
        });

        const createdBill = await bill.save();
        res.status(201).json(createdBill);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Mark bill as paid
// @route   PUT /api/bills/:id/pay
// @access  Private (Admin/system)
const markBillPaid = async (req, res) => {
    try {
        const bill = await Bill.findById(req.params.id);

        if (bill) {
            bill.status = 'paid';
            const updatedBill = await bill.save();
            res.json(updatedBill);
        } else {
            res.status(404).json({ message: 'Bill not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllBills,
    getMyBills,
    createBill,
    markBillPaid,
};
