"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const db_1 = __importDefault(require("./config/db"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const teamRoutes_1 = __importDefault(require("./routes/teamRoutes"));
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
const messageRoutes_1 = __importDefault(require("./routes/messageRoutes"));
const assistantRoutes_1 = __importDefault(require("./routes/assistantRoutes"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Check DB connection
db_1.default.getConnection()
    .then(() => {
    console.log('Successfully connected to the database.');
})
    .catch((err) => {
    console.error('Failed to connect to the database:', err.message);
    process.exit(1);
});
// API Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/teams', teamRoutes_1.default);
app.use('/api/projects', projectRoutes_1.default);
app.use('/api/tasks', taskRoutes_1.default);
app.use('/api/messages', messageRoutes_1.default);
app.use('/api/assistant', assistantRoutes_1.default);
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
