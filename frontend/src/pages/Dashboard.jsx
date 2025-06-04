import LogChart from '../components/LogChart'
import LiveLogFeed from '../components/LiveLogFeed'
import ThreatMap from '../components/ThreatMap'

export default function Dashboard() {
  return (
    <div className="px-4 py-6 space-y-6 w-full max-w-7xl mx-auto">
      {/* Heading Section */}
      <div className="space-y-2 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">SOC Dashboard</h1>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-300 dark:text-gray-400">
          Dashboard Overview
        </h2>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <LogChart />
        <LiveLogFeed />
        <ThreatMap />
      </div>
    </div>
  )
}
