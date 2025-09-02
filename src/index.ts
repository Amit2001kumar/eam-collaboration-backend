import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import db from './config/db';

import authRoutes from './routes/authRoutes';
import teamRoutes from './routes/teamRoutes';
import projectRoutes from './routes/projectRoutes';
import taskRoutes from './routes/taskRoutes';
import messageRoutes from './routes/messageRoutes';
import assistantRoutes from './routes/assistantRoutes';

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Check DB connection
db.getConnection()
  .then(() => {
    console.log('Successfully connected to the database.');
  })
  .catch((err) => {
    console.error('Failed to connect to the database:', err.message);
    process.exit(1);
  });

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/assistant', assistantRoutes);

// Socket.io for real-time chat
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Join a team chat room
  socket.on('joinTeam', (teamId) => {
    socket.join(teamId);
    console.log(`Socket ${socket.id} joined team ${teamId}`);
  });

  // Handle incoming messages
  socket.on('sendMessage', (data) => {
    // Broadcast the message to all clients in the team's room
    io.to(data.teamId).emit('newMessage', data);
  });

  // Handle disconnections
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
