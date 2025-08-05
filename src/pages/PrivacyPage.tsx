import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Eye, Lock, Database } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 px-4 py-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          to="/"
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
          <p className="text-slate-600 mt-1">Last updated: January 2025</p>
        </div>
      </div>

      {/* Sections */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
          <Eye className="w-6 h-6 mr-2 text-blue-600" />
          Information We Collect
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          We collect information you provide directly to us, such as when you create an account, 
          use our services, or contact us for support. This may include:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
          <li>Personal information (name, email address, phone number)</li>
          <li>Account credentials and preferences</li>
          <li>Usage data and analytics</li>
          <li>Device and browser information</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
          <Database className="w-6 h-6 mr-2 text-blue-600" />
          How We Use Your Information
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          We use the information we collect to:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
          <li>Provide, maintain, and improve our services</li>
          <li>Process transactions and send related information</li>
          <li>Send technical notices and support messages</li>
          <li>Respond to your comments and questions</li>
          <li>Monitor and analyze trends and usage</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
          <Lock className="w-6 h-6 mr-2 text-blue-600" />
          Data Security
        </h2>
        <p className="text-gray-700 leading-relaxed">
          We implement appropriate technical and organizational measures to protect your personal 
          information against unauthorized access, alteration, disclosure, or destruction. However, 
          no method of transmission over the internet or electronic storage is completely secure.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          You have the right to:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
          <li>Access, update, or delete your personal information</li>
          <li>Object to processing of your personal information</li>
          <li>Request data portability</li>
          <li>Withdraw consent at any time</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
        <p className="text-gray-700 leading-relaxed">
          If you have any questions about this Privacy Policy, please contact us at{' '}
          <a href="mailto:privacy@yourcompany.com" className="text-blue-600 hover:text-blue-800">
            privacy@yourcompany.com
          </a>.
        </p>
      </section>
    </div>
  );
}
