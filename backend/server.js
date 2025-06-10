const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const streamWindowsLogs = require('./logReader');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('Client connected');
  streamWindowsLogs(socket);
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
