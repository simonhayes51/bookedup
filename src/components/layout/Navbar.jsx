import { Link, useLocation } from 'react-router-dom';
import { Music, Menu, X, User, LogOut, Settings, MessageSquare, Calendar } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../ui';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Find Performers', href: '/performers' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Pricing', href: '/pricing' },
  ];

  const userNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: User },
    { name: 'Messages', href: '/messages', icon: MessageSquare },
    { name: 'Bookings', href: '/bookings', icon: Calendar },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Music className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">BookedUp</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-all px-4 py-2 rounded-lg ${
                  isActive(item.href)
                    ? 'bg-purple-50 text-purple-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex md:items-center md:space-x-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-3 focus:outline-none hover:bg-gray-50 px-4 py-2 rounded-lg transition-all border border-gray-200"
                >
                  <Avatar
                    src={user?.avatar}
                    alt={`${user?.firstName} ${user?.lastName}`}
                    size="sm"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {user?.firstName}
                  </span>
                </button>

                {/* Dropdown */}
                {isUserMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-20">
                      {userNavigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <item.icon className="w-5 h-5 mr-3 text-gray-500" />
                          {item.name}
                        </Link>
                      ))}
                      <div className="border-t border-gray-100 my-1" />
                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-5 h-5 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors px-4 py-2 rounded-lg hover:bg-gray-50"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="btn-primary text-sm px-5 py-2.5"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-gray-900 focus:outline-none p-2 hover:bg-gray-50 rounded-lg transition-all"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-4 py-2.5 text-base font-medium rounded-lg transition-colors ${
                  isActive(item.href)
                    ? 'bg-purple-50 text-purple-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {isAuthenticated ? (
              <>
                <div className="border-t border-gray-200 my-2" />
                {userNavigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="flex items-center px-4 py-2.5 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="w-5 h-5 mr-3 text-gray-500" />
                    {item.name}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-2.5 text-base font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <div className="border-t border-gray-200 my-2" />
                <Link
                  to="/login"
                  className="block px-4 py-2.5 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-2.5 text-base font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
