import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { time: '00:00', logs: 10 },
  { time: '01:00', logs: 20 },
  { time: '02:00', logs: 15 },
  { time: '03:00', logs: 30 },
  { time: '04:00', logs: 25 },
]

export default function LogChart() {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow h-64">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Log Volume Over Time</h3>
      <ResponsiveContainer width="40%" height="80%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="logs" stroke="#22d3ee" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}