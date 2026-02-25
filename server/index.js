
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/authRoutes'));
app.use('/api/notices', require('./routes/noticeRoutes'));
app.use('/api/complaints', require('./routes/complaintRoutes'));
app.use('/api/bills', require('./routes/billRoutes'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/communityconnect')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

app.get('/', (req, res) => {
    res.send('CommunityConnect API is running');
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
