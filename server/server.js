import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import noticeRoutes from './routes/notices.js';
import complaintRoutes from './routes/complaints.js';
import billRoutes from './routes/bills.js';
import visitorRoutes from './routes/visitors.js';
import facilityRoutes from './routes/facilities.js';
import userRoutes from './routes/users.js';

import { createServer } from 'http';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*', // For development, allow all origins
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
});

app.set('io', io);

io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});


// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/visitors', visitorRoutes);
app.use('/api/facilities', facilityRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/community_connect';

// Database connection
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT} with Socket.io`);
        });
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
    });
