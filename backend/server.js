const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { spawn } = require('child_process');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

app.use(cors());

io.on('connection', (socket) => {
  console.log('Client connected');

  // Tail system log in real-time
  const tail = spawn('tail', ['-F', '/var/log/syslog']); // or '/var/log/auth.log', etc.

  tail.stdout.on('data', (data) => {
    const lines = data.toString().split('\n').filter(line => line.trim() !== '');
    lines.forEach(line => {
      socket.emit('newLog', {
        timestamp: new Date().toLocaleTimeString(),
        message: line
      });
    });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    tail.kill(); // Stop tailing when client disconnects
  });
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
