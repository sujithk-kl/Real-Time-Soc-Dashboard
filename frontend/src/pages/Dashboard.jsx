export default function Dashboard() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow">👥 Devices</div>
        <div className="bg-white p-4 rounded shadow">⚠️ Alerts</div>
        <div className="bg-white p-4 rounded shadow">📊 Logs</div>
        <div className="bg-white p-4 rounded shadow">🌍 Threats</div>
      </div>
    </div>
  )
}
