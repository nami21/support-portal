import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Shield, Mail, Lock, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const { user, login, isLoading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showDemoAccounts, setShowDemoAccounts] = useState(false);

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    
    const success = await login(email, password);
    if (!success) {
      setLocalError(error || 'Invalid credentials. Please try again.');
    }
  };

  const demoAccounts = [
    { 
      email: 'cto@company.com', 
      role: 'Admin User', 
      password: 'demo_password',
      description: 'Full system access, user management, content creation'
    },
    { 
      email: 'admin@company.com', 
      role: 'Admin User', 
      password: 'demo_password',
      description: 'Full system access, user management, content creation'
    },
    { 
      email: 'support@company.com', 
      role: 'Support Agent', 
      password: 'demo_password',
      description: 'Document management, goal approval, team oversight'
    },
    { 
      email: 'user@company.com', 
      role: 'Regular User', 
      password: 'demo_password',
      description: 'Standard employee access, goal submission, document viewing'
    },
    { 
      email: 'unassigned@company.com', 
      role: 'Unassigned User', 
      password: 'demo_password',
      description: 'Pending role assignment, limited access to assignment page only'
    }
  ];

  const fillDemoCredentials = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
    setLocalError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-grey-50 via-grey-100 to-grey-200 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl mb-6 shadow-lg">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent mb-2">
            Support Hub
          </h1>
          <p className="text-grey-600 text-lg">Welcome back to your workspace</p>
        </div>

        {/* Main Login Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 mb-6">
          {(localError || error) && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3 text-red-700">
              <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Authentication Error</p>
                <p className="text-sm mt-1">{localError || error}</p>
              </div>
            </div>
          )}

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-grey-700 mb-3">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-grey-400 w-5 h-5" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-grey-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-grey-50/50 hover:bg-white"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-grey-700 mb-3">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-grey-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 border-2 border-grey-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-grey-50/50 hover:bg-white"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-grey-400 hover:text-grey-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-grey-600 bg-grey-100 border-grey-300 rounded focus:ring-grey-500 focus:ring-2"
                />
                <span className="ml-2 text-sm text-grey-600">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-grey-600 hover:text-black font-medium transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-semibold rounded-xl hover:from-gray-900 hover:to-black focus:outline-none focus:ring-2 focus:ring-grey-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>

        {/* Demo Accounts Section */}
        <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-grey-700">Pre-created Accounts</h3>
            <button
              onClick={() => setShowDemoAccounts(!showDemoAccounts)}
              className="text-xs text-red-600 hover:text-red-700 font-medium transition-colors"
            >
              {showDemoAccounts ? 'Hide' : 'Show'} Available Accounts
            </button>
          </div>
          
          {showDemoAccounts && (
            <div className="space-y-3">
              {demoAccounts.map((account, index) => (
                <button
                  key={index}
                  onClick={() => fillDemoCredentials(account.email, account.password)}
                  className="w-full text-left p-4 rounded-xl hover:bg-white/70 transition-all duration-200 border border-transparent hover:border-white/50 group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium text-grey-700 group-hover:text-black">
                          {account.email}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          account.role === 'Admin User' ? 'bg-grey-100 text-black' :
                          account.role === 'Support Agent' ? 'bg-grey-100 text-grey-700' :
                          'bg-grey-200 text-grey-800'
                        }`}>
                          {account.role}
                        </span>
                      </div>
                      <p className="text-xs text-grey-500 group-hover:text-grey-600 transition-colors">
                        {account.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
              <div className="pt-2 border-t border-slate-200">
                <p className="text-xs text-grey-500 text-center">
                  <span className="font-medium">All accounts use password:</span> demo_password
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-grey-500">
            Need access? Contact your administrator or{' '}
            <a href="mailto:support@company.com" className="text-red-600 hover:text-red-700 font-medium">
              support@company.com
            </a>
          </p>
        </div>
      </div>
      </div>
      
      {/* Login Page Footer */}
      <footer className="bg-white/60 backdrop-blur border-t border-white/30 text-sm text-grey-600 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} TG Hub. All rights reserved.</p>
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <a href="#" className="hover:text-black transition-colors">Privacy</a>
            <a href="#" className="hover:text-black transition-colors">Terms</a>
            <a href="#" className="hover:text-black transition-colors">Help</a>
          </div>
        </div>
      </footer>
    </div>
  );
}