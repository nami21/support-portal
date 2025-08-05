import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  LogOut, Home, Gem, Shield, User, ChevronDown,
  Users, FileText, Sparkles, BookOpen,
  Menu
} from 'lucide-react';
import Footer from '../pages/Footer';

export default function Layout() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdown(null);
  }, [location.pathname]);

  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'unassigned') return <Navigate to="/unassigned" replace />;

  const navItems = [
    { label: 'Spotlights', to: '/spotlights', icon: Sparkles, color: 'indigo' },
    { label: 'About Us', to: '/about-us', icon: Users, color: 'green' },
    { label: 'Documents', to: '/documents', icon: FileText, color: 'orange' },
    { label: 'Training & Awaress', to: '/training', icon: BookOpen, color: 'blue' },
  ];

  const dropdowns = {
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      <header className="bg-white/95 backdrop-blur-md border-b border-grey-200/60 sticky top-0 z-40">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16 w-full">
      
      {/* Left: Mobile Menu Button */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-grey-600 hover:text-black focus:outline-none"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Support Portal Logo + Label */}
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-red-900 rounded-lg flex items-center justify-center">
            <Gem className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent">
            IT Support Portal
          </span>
        </Link>
      </div>

      {/* Center: Navigation (desktop only) */}
      <nav className="hidden md:flex space-x-6 mx-8">
        {navItems.map(({ label, to, icon: Icon, color }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
              location.pathname === to
                ? `bg-red-100 text-red-700`
                : `text-grey-600 hover:text-red-600 hover:bg-red-50`
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </Link>
        ))}

        {Object.entries(dropdowns).map(([key, { label, icon: Icon, color, routes }]) => (
          <div key={key} className="relative">
            <button
              onClick={() => setDropdown(dropdown === key ? null : key)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                routes && location.pathname.startsWith(routes[0].to.split('/')[1])
                  ? `bg-grey-100 text-black`
                  : `text-grey-600 hover:text-black hover:bg-grey-50`
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${dropdown === key ? 'rotate-180' : ''}`} />
            </button>
            {dropdown === key && routes && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
                {routes.map(({ to, label, icon: SubIcon }) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setDropdown(null)}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm transition-colors ${
                      location.pathname === to
                        ? `bg-grey-100 text-black`
                        : 'text-grey-600 hover:bg-grey-50 hover:text-black'
                    }`}
                  >
                    <SubIcon className="w-4 h-4" />
                    <span>{label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}

      </nav>

      {/* Right: Profile & Logout */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3 px-3 py-2 rounded-lg">
          <div className="w-8 h-8 bg-gradient-to-r from-grey-600 to-black rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-black">{user.name}</p>
            <p className="text-xs text-grey-500 capitalize">{user.role}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="p-2 text-grey-400 hover:text-grey-600 hover:bg-grey-100 rounded-lg transition-colors"
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>

  {/* Mobile Dropdown (unchanged) */}
  {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg border-b border-grey-200 z-50">
            <nav className="flex flex-col space-y-1 p-4 text-sm text-grey-700">
              {navItems.map(({ label, to }) => (
                <Link key={to} to={to} onClick={() => setMobileMenuOpen(false)} className="hover:text-red-600">
                  {label}
                </Link>
              ))}

              {Object.entries(dropdowns).map(([key, { label, routes }]) => (
                <div key={key}>
                  <button
                    onClick={() => setDropdown(dropdown === key ? null : key)}
                    className="w-full flex justify-between items-center py-2"
                  >
                    <span>{label}</span>
                    <ChevronDown className={`w-4 h-4 transform transition-transform ${dropdown === key ? 'rotate-180' : ''}`} />
                  </button>
                  {dropdown === key && routes && (
                    <div className="pl-4 flex flex-col space-y-1">
                      {routes.map(({ to, label }) => (
                        <Link key={to} to={to} onClick={() => setMobileMenuOpen(false)} className="hover:text-black">
                          {label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {user.role === 'admin' && (
                <span></span>
              )}
            </nav>
          </div>
        )}
</header>


      {dropdown && (
        <div className="fixed inset-0 z-30" onClick={() => setDropdown(null)} />
      )}

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full bg-grey-50">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
