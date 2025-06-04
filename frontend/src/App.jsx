import DarkModeToggle from './components/DarkModeToggle'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4">
      <div className="flex justify-end mb-4">
        <DarkModeToggle />
      </div>
      <Dashboard />
    </div>
  )
}

export default App
