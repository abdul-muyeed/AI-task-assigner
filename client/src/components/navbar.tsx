import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export const NavBar = () => {
  return (
    <nav className={cn(
      "w-full bg-white shadow-sm border-b border-gray-200",
      "fixed top-0 left-0 z-10"
    )}>
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-indigo-700 tracking-tight">AI Task Assigner</span>
        </div>
        <div>
          <Link
            to="/login"
            className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors px-4 py-2"
          >
            Login
          </Link>
            <Link
            to="/signup"
            className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors px-4 py-2"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
