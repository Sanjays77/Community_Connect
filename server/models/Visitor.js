import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    purpose: { type: String, required: true },
    hostApartment: { type: String, required: true },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Denied', 'Checked In', 'Checked Out'],
        default: 'Pending'
    },
    enteredAt: { type: Date },
    exitedAt: { type: Date },
    recordedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const Visitor = mongoose.model('Visitor', visitorSchema);
export default Visitor;
