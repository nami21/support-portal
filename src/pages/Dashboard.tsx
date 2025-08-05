import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { 
  Shield, 
  Monitor, 
  HardDrive, 
  Wifi, 
  Ticket,
  Bot,
  Headphones,
  Bell,
  Zap,
  ExternalLink,
  Sparkles
} from 'lucide-react';

const faqCategories = [
  {
    id: 'policies',
    title: 'Policies & Benefits',
    description: 'Company policies, benefits, and HR information',
    icon: Shield,
    color: 'from-red-700 to-red-800',
    hoverColor: 'hover:from-red-800 hover:to-red-900'
  },
  {
    id: 'it-systems',
    title: 'IT Systems & Software',
    description: 'Software issues, system access, and applications',
    icon: Monitor,
    color: 'from-red-700 to-red-800',
    hoverColor: 'hover:from-red-800 hover:to-red-900'
  },
  {
    id: 'hardware',
    title: 'Hardware & Devices',
    description: 'Laptops, phones, printers, and other equipment',
    icon: HardDrive,
    color: 'from-red-700 to-red-800',
    hoverColor: 'hover:from-red-800 hover:to-red-900'
  },
  {
    id: 'network',
    title: 'Network & Connectivity',
    description: 'WiFi, VPN, internet, and network troubleshooting',
    icon: Wifi,
    color: 'from-red-700 to-red-800',
    hoverColor: 'hover:from-red-800 hover:to-red-900'
  }
];

const quickActions = [
  {
    title: 'Create a Ticket',
    description: 'Submit a support request',
    icon: Ticket,
    color: 'from-red-600 to-red-700',
    hoverColor: 'hover:from-red-700 hover:to-red-800',
    link: 'https://mail.google.com/mail/?view=cm&fs=1&to=support@example.com&su=Support%20Ticket&body=Hi%2C%20I%20need%20help%20with...'
  },
  {
    title: 'AI Assistant',
    description: 'Get instant help from our AI assistant',
    icon: Bot,
    color: 'from-red-600 to-red-700',
    hoverColor: 'hover:from-red-700 hover:to-red-800', 
    action: 'chat'
  },
  {
    title: 'Contact Support',
    description: 'Speak with a human agent',
    icon: Headphones,
    color: 'from-red-600 to-red-700',
    hoverColor: 'hover:from-red-700 hover:to-red-800',
    link: '/contact-support'
  }
];

// Helper function to convert Google Drive share link to thumbnail
const getGoogleDriveThumbnail = (url: string): string => {
  // Check if it's a Google Drive share link
  const driveMatch = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
  if (driveMatch) {
    const fileId = driveMatch[1];
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w200`;
  }
  return url; // Return original URL if not a Google Drive link
};

interface DashboardProps {
  onOpenChat?: () => void;
  onToggleChat?: () => void;
}

export default function Dashboard({ onOpenChat, onToggleChat }: DashboardProps) {
  const { announcements, systemUpdates, faqs } = useApp();

  const activeAnnouncements = announcements.filter(a => a.isActive);
  const recentUpdates = systemUpdates.slice(0, 3);

  const handleQuickAction = (action: string) => {
    if (action === 'chat') {
      if (onToggleChat) {
        onToggleChat();
      } else if (onOpenChat) {
        onOpenChat();
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section with Integrated Quick Actions */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black rounded-2xl p-8 text-white space-y-6">
        <h1 className="text-3xl font-bold">Welcome to Support Portal</h1>
        <p className="text-red-100 text-lg">
          Your one-stop destination for all internal support needs
        </p>
      
        {/* Quick Actions */}
        <section className="flex flex-wrap items-center gap-4">
          <h2 className="text-base font-semibold text-white underline underline-offset-4 decoration-white">
            Need Immediate Help?
          </h2>
      
          <div className="flex flex-wrap items-center gap-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
      
              const content = (
                <div
                  className={`
                    group flex items-center space-x-2 
                    bg-white/10 hover:bg-white/20 
                    hover:scale-[1.03] hover:shadow-md 
                    rounded-md px-3 py-2 transition-all duration-200 
                    cursor-pointer ${action.hoverColor}
                  `}
                >
                  <div
                    className={`
                      w-7 h-7 bg-gradient-to-r ${action.color} 
                      rounded-md flex items-center justify-center 
                      group-hover:scale-110 group-hover:rotate-6 transition-transform duration-200
                    `}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-white group-hover:text-white-300 transition-colors">
                    {action.title}
                  </span>
                </div>
              );

              return action.link ? (
                <Link key={index} to={action.link}>
                  {content}
                </Link>
              ) : (
                <div key={index} onClick={() => handleQuickAction(action.action!)}>
                  {content}
                </div>
              );
            })}
          </div>
        </section>
      </div>

      
      {/* FAQ Categories */}
      <section>
        <h2 className="text-2xl font-bold text-black mb-6">FAQ Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {faqCategories.map((category) => {
            const Icon = category.icon;
            const categoryFaqs = faqs.filter(faq => faq.category === category.id);
            
            return (
              <Link
                key={category.id}
                to={`/faq/${category.id}`}
                className={`group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-grey-100 ${category.hoverColor}`}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-black mb-2 group-hover:text-grey-700 transition-colors">
                  {category.title}
                </h3>
                <p className="text-grey-600 text-sm mb-3">{category.description}</p>
                <span className="text-xs font-medium text-grey-500">
                  {categoryFaqs.length} FAQ{categoryFaqs.length !== 1 ? 's' : ''}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Announcements */}
        <section className="bg-white rounded-xl p-6 shadow-sm border border-grey-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-black flex items-center">
              <Bell className="w-5 h-5 mr-2 text-red-500" />
              Memo & Announcements
            </h2>
            <Link 
              to="/announcements" 
              className="text-red-600 hover:text-red-700 text-sm flex items-center"
            >
              View All
              <ExternalLink className="w-3 h-3 ml-1" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {activeAnnouncements.length > 0 ? (
              activeAnnouncements.slice(0, 3).map((announcement) => (
                <div key={announcement.id} className="border-l-4 border-black pl-4 py-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-black">{announcement.title}</h3>
                      <p className="text-grey-600 text-sm mt-1 line-clamp-2">{announcement.description}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          announcement.type === 'alert' ? 'bg-red-100 text-red-700' :
                          'bg-grey-100 text-grey-700'
                        }`}>
                          {announcement.type}
                        </span>
                        <span className="text-xs text-grey-500">
                          {new Date(announcement.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-grey-500 text-center py-8">No active announcements</p>
            )}
          </div>
        </section>

        {/* System Updates */}
        <section className="bg-white rounded-xl p-6 shadow-sm border border-grey-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-black flex items-center">
              <Zap className="w-5 h-5 mr-2 text-red-500" />
              System Updates
            </h2>
            <Link 
              to="/system-updates" 
              className="text-red-600 hover:text-red-700 text-sm flex items-center"
            >
              View All
              <ExternalLink className="w-3 h-3 ml-1" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentUpdates.length > 0 ? (
              recentUpdates.map((update) => {
                const thumbnailUrl = getGoogleDriveThumbnail(update.imageUrl);
                
                return (
                  <div key={update.id} className="flex space-x-4">
                    <img 
                      src={thumbnailUrl} 
                      alt={update.title}
                      className="w-16 h-16 rounded-lg object-cover cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => window.open(update.imageUrl, '_blank')}
                      onError={(e) => {
                        // Fallback to original URL if thumbnail fails
                        const target = e.target as HTMLImageElement;
                        if (target.src !== update.imageUrl) {
                          target.src = update.imageUrl;
                        }
                      }}
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-black">{update.title}</h3>
                      <p className="text-grey-600 text-sm mt-1 line-clamp-2">{update.description}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          update.severity === 'high' ? 'bg-red-100 text-red-700' :
                          update.severity === 'medium' ? 'bg-grey-100 text-grey-700' :
                          'bg-grey-200 text-grey-800'
                        }`}>
                          {update.severity}
                        </span>
                        <span className="text-xs text-grey-500">
                          {new Date(update.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-grey-500 text-center py-8">No recent updates</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}