<<<<<<< HEAD
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
=======

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
>>>>>>> 8044050 (chore: add client and server folders)
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
<<<<<<< HEAD
        enum: ['Resident', 'Admin', 'Security'],
        default: 'Resident'
    },
    apartmentNumber: { type: String, required: false }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
=======
        enum: ['admin', 'resident', 'security'],
        default: 'resident'
    },
    flatNumber: { type: String }, // For residents
    phoneNumber: { type: String },
    createdAt: { type: Date, default: Date.now }
});

// Hash password before saving
UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});

// Compare password method
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
>>>>>>> 8044050 (chore: add client and server folders)
