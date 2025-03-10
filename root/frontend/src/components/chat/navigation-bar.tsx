import { Link } from "react-router-dom"
import { Code } from "lucide-react"

export default function NavigationBar() {
  return (
    <div className="bg-background h-20 p-4 border-t border-gray-800 flex items-center gap-6">
      <div className="flex items-center gap-2">
        <Code className="w-5 h-5" />
        <span className="font-bold">DevUI</span>
      </div>
      <nav className="flex gap-6">
        <Link to="#" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-300">
          Home
        </Link>
        <Link to="#" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-300">
          Templates
        </Link>
        <Link to="#" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-300">
          About us
        </Link>
      </nav>
    </div>
  )
}

