import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// Connect to your backend on port 4000
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

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Error':
      case 'Critical':
        return 'text-red-600 dark:text-red-400';
      case 'Warning':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'Information':
        return 'text-blue-600 dark:text-blue-400';
      case 'Verbose':
        return 'text-gray-500 dark:text-gray-400';
      default:
        return 'text-gray-600 dark:text-gray-300';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow h-64 overflow-y-auto">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Live Log Feed</h3>
      <ul className="text-sm text-gray-800 dark:text-gray-300 space-y-1">
        {logs.length === 0 && <li>No logs yet...</li>}
        {logs.map((log, index) => (
          <li key={index} className="border-b border-gray-300 dark:border-gray-700 pb-1">
            <span className="mr-2 text-xs px-2 py-0.5 rounded-full font-medium border dark:border-gray-600 border-gray-300 bg-gray-100 dark:bg-gray-800">
              <span className={getSeverityColor(log.severity)}>
                {log.severity}
              </span>
            </span>
            <span className="text-green-600 dark:text-green-400 mr-2">[{log.timestamp}]</span>
            {log.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
