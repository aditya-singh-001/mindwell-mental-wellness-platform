import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, Heart, Brain } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Resources', path: '/resources' },
    { name: 'Mood Tracker', path: '/mood-tracker' },
    { name: 'Chatbot', path: '/chatbot' },
    { name: 'Profile', path: '/profile' },
  ];

  return (
    <header className={`sticky top-0 z-50 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <Brain className={`h-8 w-8 ${isDarkMode ? 'text-teal-400' : 'text-teal-600'}`} />
            <span className="text-xl font-bold">MindWell</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`font-medium hover:text-teal-600 transition-colors ${
                  location.pathname === item.path 
                    ? isDarkMode 
                      ? 'text-teal-400 border-b-2 border-teal-400' 
                      : 'text-teal-600 border-b-2 border-teal-600'
                    : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`block py-2 px-4 rounded-md ${
                      location.pathname === item.path
                        ? isDarkMode
                          ? 'bg-gray-700 text-teal-400'
                          : 'bg-gray-100 text-teal-600'
                        : ''
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    toggleDarkMode();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 w-full py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                  {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;