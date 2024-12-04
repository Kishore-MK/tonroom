import { Moon, Sun } from 'lucide-react';
import { useTheme } from './context/ThemeContext';

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-2 rounded-full transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-700"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-6 h-6 text-yellow-400" />
      ) : (
        <Moon className="w-6 h-6 text-gray-600" />
      )}
    </button>
  );
}