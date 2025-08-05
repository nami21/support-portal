import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  AlertTriangle,
  Scale,
  Users,
  ArrowLeft,
} from 'lucide-react';

const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          to="/"
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Terms of Service</h1>
          <p className="text-slate-600 mt-1">Last updated: January 2025</p>
        </div>
      </div>

      {/* Sections */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
          <Users className="w-6 h-6 mr-2 text-green-600" />
          Acceptance of Terms
        </h2>
        <p className="text-gray-700 leading-relaxed">
          By accessing and using our service, you accept and agree to be bound by the terms 
          and provision of this agreement. If you do not agree to abide by the above, please 
          do not use this service.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Use License</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Permission is granted to temporarily access our service for personal, non-commercial 
          transitory viewing only. This is the grant of a license, not a transfer of title, and 
          under this license you may not:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
          <li>Modify or copy the materials</li>
          <li>Use the materials for commercial purposes or public display</li>
          <li>Attempt to reverse engineer any software</li>
          <li>Remove any copyright or proprietary notations</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">User Accounts</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          When you create an account with us, you must provide information that is accurate, 
          complete, and current at all times. You are responsible for safeguarding the password 
          and for all activities that occur under your account.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
          <AlertTriangle className="w-6 h-6 mr-2 text-green-600" />
          Prohibited Uses
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          You may not use our service:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
          <li>For any unlawful purpose or to solicit others to unlawful acts</li>
          <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
          <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
          <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
          <li>To submit false or misleading information</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
          <Scale className="w-6 h-6 mr-2 text-green-600" />
          Disclaimer
        </h2>
        <p className="text-gray-700 leading-relaxed">
          The materials on our service are provided on an 'as is' basis. We make no warranties, 
          expressed or implied, and hereby disclaim and negate all other warranties including, 
          without limitation, implied warranties or conditions of merchantability, fitness for 
          a particular purpose, or non-infringement of intellectual property or other violation of rights.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Limitations</h2>
        <p className="text-gray-700 leading-relaxed">
          In no event shall our company or its suppliers be liable for any damages (including, 
          without limitation, damages for loss of data or profit, or due to business interruption) 
          arising out of the use or inability to use our service, even if we have been notified 
          orally or in writing of the possibility of such damage.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
        <p className="text-gray-700 leading-relaxed">
          If you have any questions about these Terms of Service, please contact us at{' '}
          <a href="mailto:legal@yourcompany.com" className="text-green-600 hover:text-green-800">
            legal@yourcompany.com
          </a>.
        </p>
      </section>
    </div>
  );
};

export default TermsPage;
