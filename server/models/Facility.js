import mongoose from 'mongoose';

const facilitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        enum: ['Community Hall', 'Gym', 'Swimming Pool', 'Guest Parking']
    },
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    bookedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Facility = mongoose.model('Facility', facilitySchema);

export default Facility;
