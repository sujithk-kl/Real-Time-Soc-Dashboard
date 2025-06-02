export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white p-4 space-y-4">
      <h1 className="text-2xl font-bold">SOC Dashboard</h1>
      <nav className="flex flex-col space-y-2">
        <a href="#" className="hover:bg-gray-700 p-2 rounded">Dashboard</a>
        <a href="#" className="hover:bg-gray-700 p-2 rounded">Alerts</a>
        <a href="#" className="hover:bg-gray-700 p-2 rounded">Reports</a>
        <a href="#" className="hover:bg-gray-700 p-2 rounded">Settings</a>
      </nav>
    </div>
  )
}
