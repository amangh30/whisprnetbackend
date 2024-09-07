const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // Replace with your client's URL
    methods: ["GET", "POST"]
  }
});

// Use CORS middleware for Express (optional, as Socket.IO has its own CORS configuration)
app.use(cors());

// Example route
app.get('/', (req, res) => {
  res.send('Socket.IO server with CORS is running');
}); 

// Socket.io setup
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');``
  });

  socket.on('message', (message) => {
    socket.broadcast.emit('give-message', message); // Broadcast message to all clients
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
