import { useEffect, useState } from 'react'

export default function LiveLogFeed() {
  const [logs, setLogs] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs((prev) => [
        { timestamp: new Date().toLocaleTimeString(), message: 'Unauthorized login attempt' },
        ...prev.slice(0, 9),
      ])
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow h-64 overflow-y-auto">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Live Log Feed</h3>
      <ul className="text-sm text-gray-800 dark:text-gray-300 space-y-1">
        {logs.map((log, index) => (
          <li key={index}>
            <span className="text-gray-500">{log.timestamp}:</span> {log.message}
          </li>
        ))}
      </ul>
    </div>
  )
}
