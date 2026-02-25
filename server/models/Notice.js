<<<<<<< HEAD
import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const Notice = mongoose.model('Notice', noticeSchema);
export default Notice;
=======

const mongoose = require('mongoose');

const NoticeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notice', NoticeSchema);
>>>>>>> 8044050 (chore: add client and server folders)
