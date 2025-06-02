import Sidebar from './components/Sidebar'
import DarkModeToggle from './components/DarkModeToggle'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Sidebar />
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="flex justify-end mb-4">
          <DarkModeToggle />
        </div>
        <Dashboard />
      </div>
    </div>
  )
}

export default App
