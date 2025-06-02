import { useEffect, useState } from 'react'

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(() => localStorage.theme === 'dark')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.theme = isDark ? 'dark' : 'light'
  }, [isDark])

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="bg-gray-200 dark:bg-gray-700 text-sm p-2 rounded ml-auto"
    >
      {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  )
}
