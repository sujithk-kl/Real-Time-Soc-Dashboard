import React, { useEffect, useState } from 'react';
import socket from '../services/socket';

const LiveLogTable = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    socket.on('newLog', (log) => {
      setLogs((prevLogs) => [log, ...prevLogs.slice(0, 49)]); // keep only latest 50 logs
    });

    return () => socket.off('newLog');
  }, []);

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-black dark:text-white">Live Log Feed</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Time</th>
              <th className="px-4 py-2 text-left">Severity</th>
              <th className="px-4 py-2 text-left">Log Information</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 dark:text-gray-100">
            {logs.map((log, index) => (
              <tr key={index} className="border-b border-gray-300 dark:border-gray-700">
                <td className="px-4 py-2">{log.date}</td>
                <td className="px-4 py-2">{log.time}</td>
                <td className="px-4 py-2">{log.severity}</td>
                <td className="px-4 py-2">{log.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LiveLogTable;
