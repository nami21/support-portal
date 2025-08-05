import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MessageCircle, 
  Clock, 
  MapPin,
  Headphones,
  Users,
  AlertCircle
} from 'lucide-react';

const contactMethods = [
  {
    title: 'Email Support',
    description: 'Send us an email and we\'ll respond within 24 hours',
    icon: Mail,
    contact: 'support@company.com',
    availability: '24/7',
    color: 'from-grey-700 to-black'
  },
  {
    title: 'Phone Support',
    description: 'Call us for immediate assistance',
    icon: Phone,
    contact: '+1 (555) 123-4567',
    availability: 'Mon-Fri, 9AM-6PM EST',
    color: 'from-grey-700 to-black'
  },
  {
    title: 'Live Chat',
    description: 'Chat with our support team in real-time',
    icon: MessageCircle,
    contact: 'Available on website',
    availability: 'Mon-Fri, 9AM-6PM EST',
    color: 'from-grey-700 to-black'
  },
  {
    title: 'Emergency Hotline',
    description: 'For critical system outages and emergencies',
    icon: AlertCircle,
    contact: '+1 (555) 911-HELP',
    availability: '24/7',
    color: 'from-grey-700 to-black' 
  }
];

const departments = [
  {
    name: 'IT Support',
    email: 'it-support@company.com',
    phone: '+1 (555) 123-4567 ext. 101',
    description: 'Hardware, software, and network issues'
  },
  {
    name: 'Human Resources',
    email: 'hr@company.com',
    phone: '+1 (555) 123-4567 ext. 201',
    description: 'Benefits, policies, and employee relations'
  },
  {
    name: 'Facilities',
    email: 'facilities@company.com',
    phone: '+1 (555) 123-4567 ext. 301',
    description: 'Office space, equipment, and maintenance'
  },
  {
    name: 'Security',
    email: 'security@company.com',
    phone: '+1 (555) 123-4567 ext. 401',
    description: 'Access control and security incidents'
  }
];

export default function ContactSupport() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link 
          to="/" 
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Contact Support</h1>
          <p className="text-slate-600 mt-1">Get help from our support team</p>
        </div>
      </div>

      {/* Contact Methods */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">How to Reach Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${method.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{method.title}</h3>
                    <p className="text-slate-600 text-sm mb-3">{method.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <span className="font-medium text-slate-700 mr-2">Contact:</span>
                        <span className="text-blue-600">{method.contact}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="w-4 h-4 text-slate-400 mr-2" />
                        <span className="text-slate-600">{method.availability}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Department Contacts */}
      <section className="bg-white rounded-xl p-8 shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
          <Users className="w-6 h-6 mr-2 text-blue-500" />
          Department Contacts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {departments.map((dept, index) => (
            <div key={index} className="p-4 border border-slate-200 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{dept.name}</h3>
              <p className="text-slate-600 text-sm mb-3">{dept.description}</p>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Mail className="w-4 h-4 text-slate-400 mr-2" />
                  <a href={`mailto:${dept.email}`} className="text-blue-600 hover:text-blue-700">
                    {dept.email}
                  </a>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="w-4 h-4 text-slate-400 mr-2" />
                  <a href={`tel:${dept.phone}`} className="text-blue-600 hover:text-blue-700">
                    {dept.phone}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Office Information */}
      <section className="bg-white rounded-xl p-8 shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
          <MapPin className="w-6 h-6 mr-2 text-green-500" />
          Office Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Main Office</h3>
            <div className="space-y-2 text-slate-600">
              <p>123 Business Avenue</p>
              <p>Suite 100</p>
              <p>New York, NY 10001</p>
              <p className="pt-2">
                <strong>Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM EST
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Support Hours</h3>
            <div className="space-y-2 text-slate-600">
              <div className="flex justify-between">
                <span>Monday - Friday:</span>
                <span>9:00 AM - 6:00 PM EST</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday:</span>
                <span>10:00 AM - 2:00 PM EST</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span>Emergency only</span>
              </div>
              <div className="pt-2 text-sm">
                <strong>Emergency Support:</strong> Available 24/7 for critical issues
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}