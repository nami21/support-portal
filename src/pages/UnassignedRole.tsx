import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { 
  Shield, 
  Clock, 
  Mail, 
  User, 
  AlertCircle,
  LogOut
} from 'lucide-react';

export default function UnassignedRole() {
  const { user, logout } = useAuth();

  // Redirect if user is not unassigned
  if (!user || user.role !== 'unassigned') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-grey-50 via-grey-100 to-grey-200 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-500 to-red-700 rounded-3xl mb-6 shadow-lg">
            <Clock className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-black mb-2">
            Account Pending
          </h1>
          <p className="text-grey-600 text-lg">Your account setup is almost complete</p>
        </div>

        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 mb-6">
          {/* Status Alert */}
          <div className="mb-8 p-6 bg-grey-50 border-2 border-grey-200 rounded-2xl">
            <div className="flex items-start space-x-4">
              <AlertCircle className="w-6 h-6 text-black mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-lg font-semibold text-black mb-2">
                  Role Assignment Required
                </h2>
                <p className="text-grey-700 leading-relaxed">
                  Your account has been created successfully, but you need an administrator to assign your role before you can access the system features.
                </p>
              </div>
            </div>
          </div>

          {/* User Information */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-black" />
              Account Information
            </h3>
            <div className="bg-grey-50 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-grey-600 font-medium">Name:</span>
                <span className="text-black font-semibold">{user.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-grey-600 font-medium">Email:</span>
                <span className="text-black">{user.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-grey-600 font-medium">Status:</span>
                <span className="inline-flex items-center px-3 py-1 bg-grey-100 text-black rounded-full text-sm font-medium">
                  <Clock className="w-3 h-3 mr-1" />
                  Unassigned
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-grey-600 font-medium">Account Created:</span>
                <span className="text-black">{new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-black mb-4">
              What happens next?
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 bg-grey-50 rounded-xl">
                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-black mb-1">Contact Administrator</h4>
                  <p className="text-grey-700 text-sm">
                    Reach out to your system administrator to request role assignment.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 bg-grey-50 rounded-xl">
                <div className="w-8 h-8 bg-grey-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-grey-900 mb-1">Role Assignment</h4>
                  <p className="text-grey-800 text-sm">
                    Administrator will assign you an appropriate role.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 bg-black/5 rounded-xl">
                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-black mb-1">Access Granted</h4>
                  <p className="text-grey-800 text-sm">
                    Once assigned, you'll have full access to the Support Hub features.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="p-6 bg-grey-100 rounded-2xl">
            <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
              <Mail className="w-5 h-5 mr-2 text-black" />
              Need Help?
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-black rounded-full"></div>
                <span className="text-grey-700">
                  Email: <a href="mailto:admin@company.com" className="text-black hover:text-grey-600 font-medium">admin@company.com</a>
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-black rounded-full"></div>
                <span className="text-grey-700">
                  Phone: <a href="tel:+15551234567" className="text-black hover:text-grey-600 font-medium">+1 (555) 123-4567</a>
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-black rounded-full"></div>
                <span className="text-grey-700">
                  Support Hours: Monday - Friday, 8:00 AM - 5:00 PM
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="text-center">
          <button
            onClick={logout}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-grey-600 text-white rounded-xl hover:bg-grey-700 focus:outline-none focus:ring-2 focus:ring-grey-500 focus:ring-opacity-50 transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-grey-500">
            Support Hub © {new Date().getFullYear()} - Secure Enterprise Platform
          </p>
        </div>
      </div>
      </div>
      
      {/* Unassigned Page Footer */}
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