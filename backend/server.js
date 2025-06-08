const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const streamWindowsLogs = require('./logReader');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  streamWindowsLogs(socket);
});

server.listen(4000, () => {
  console.log('Server listening on http://localhost:4000');
});
