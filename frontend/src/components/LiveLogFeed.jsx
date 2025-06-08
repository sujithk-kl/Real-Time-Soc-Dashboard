import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// Connect to your backend on port 4000 (make sure ports match!)
const socket = io('http://localhost:4000');

export default function LiveLogFeed() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    function handleNewLog(log) {
      setLogs(prevLogs => [log, ...prevLogs.slice(0, 19)]);
    }

    socket.on('newLog', handleNewLog);

    socket.on('connect_error', (err) => {
      console.error('Socket connection error:', err);
    });

    return () => {
      socket.off('newLog', handleNewLog);
    };
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow h-64 overflow-y-auto">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Live Log Feed</h3>
      <ul className="text-sm text-gray-800 dark:text-gray-300 space-y-1">
        {logs.length === 0 && <li>No logs yet...</li>}
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
