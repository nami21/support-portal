import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white/80 backdrop-blur border-t border-grey-200 text-sm text-grey-600 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
        <p>© {new Date().getFullYear()} TG Hub. All rights reserved.</p>
        <div className="flex space-x-4 mt-2 sm:mt-0">
          <Link to="/privacy" className="hover:text-black transition-colors">Privacy</Link>
          <Link to="/terms" className="hover:text-black transition-colors">Terms</Link>
          <Link to="/help" className="hover:text-black transition-colors">Help</Link>
        </div>
      </div>
    </footer>
  );
}