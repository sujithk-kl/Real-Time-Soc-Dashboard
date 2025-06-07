import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Replace with deployed backend URL if needed

export default function LiveLogFeed() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Real-time log from backend
    socket.on('newLog', (log) => {
      setLogs((prevLogs) => [log, ...prevLogs.slice(0, 19)]);
    });

    // Simulated logs for fallback/testing
    const interval = setInterval(() => {
      const fakeLog = {
        timestamp: new Date().toLocaleTimeString(),
        message: 'Unauthorized login attempt',
      };
      setLogs((prevLogs) => [fakeLog, ...prevLogs.slice(0, 19)]);
    }, 5000); // Change to 2000ms if you want more frequent dummy logs

    return () => {
      socket.off('newLog');
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow h-64 overflow-y-auto">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Live Log Feed</h3>
      <ul className="text-sm text-gray-800 dark:text-gray-300 space-y-1">
        {logs.map((log, index) => (
          <li key={index} className="border-b border-gray-300 dark:border-gray-700 pb-1">
            <span className="text-green-600 dark:text-green-400 mr-2">[{log.timestamp}]</span>
            {log.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
