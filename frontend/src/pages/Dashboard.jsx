import LogChart from '../components/LogChart'
import LiveLogFeed from '../components/LiveLogFeed'
import ThreatMap from '../components/ThreatMap'

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-white">SOC Dashboard</h1>
      <h2 className="text-xl text-center font-semibold text-gray-300">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LogChart />
        <LiveLogFeed />
        <ThreatMap />
      </div>
    </div>
  )
}
