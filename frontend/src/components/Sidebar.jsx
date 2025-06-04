export function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4 space-y-6 shadow-lg">
      <h1 className="text-2xl font-bold text-center">SOC Dashboard</h1>
      <nav className="flex flex-col space-y-2">
        <a href="#" className="hover:bg-gray-700 p-2 rounded transition-all">Dashboard</a>
        <a href="#" className="hover:bg-gray-700 p-2 rounded transition-all">Alerts</a>
        <a href="#" className="hover:bg-gray-700 p-2 rounded transition-all">Reports</a>
        <a href="#" className="hover:bg-gray-700 p-2 rounded transition-all">Settings</a>
      </nav>
    </div>
  )
}
