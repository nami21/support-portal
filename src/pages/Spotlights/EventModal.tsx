import React from 'react';
import { X, Calendar, Clock, MapPin, Users } from 'lucide-react';
import { CalendarEvent } from '../../types';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: CalendarEvent | null;
}

export const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, event }) => {
  if (!isOpen || !event) return null;

  const getEventTypeInfo = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'meeting':
        return { color: 'bg-blue-100 text-blue-700 border-blue-200', icon: Users, label: 'Meeting' };
      case 'deadline':
        return { color: 'bg-red-100 text-red-700 border-red-200', icon: Clock, label: 'Deadline' };
      case 'celebration':
        return { color: 'bg-pink-100 text-pink-700 border-pink-200', icon: Calendar, label: 'Celebration' };
      case 'training':
        return { color: 'bg-green-100 text-green-700 border-green-200', icon: Users, label: 'Training' };
      default:
        return { color: 'bg-gray-100 text-gray-700 border-gray-200', icon: Calendar, label: 'Event' };
    }
  };

  const eventInfo = getEventTypeInfo(event.type);
  const EventIcon = eventInfo.icon;

  const formatDate = (date: Date | string) => {
    const d = date instanceof Date ? date : new Date(date);
    if (isNaN(d.getTime())) return 'Invalid date';
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-xl max-w-md w-full shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${eventInfo.color} border`}>
              <EventIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{event.title}</h2>
              <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border ${eventInfo.color}`}>
                {eventInfo.label}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            aria-label="Close event modal"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Date */}
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div>
              <p className="font-medium text-gray-900">Date</p>
              <p className="text-gray-600">{formatDate(event.date)}</p>
            </div>
          </div>

          {/* Description */}
          {event.description && (
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Details</p>
                <p className="text-gray-600 leading-relaxed">{event.description}</p>
              </div>
            </div>
          )}

          {/* Contextual Notices */}
          {event.type === 'meeting' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Meeting Reminder:</strong> Please prepare any necessary materials and join on time.
              </p>
            </div>
          )}

          {event.type === 'deadline' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-800">
                <strong>Important:</strong> This is a deadline. Ensure all required tasks are completed.
              </p>
            </div>
          )}

          {event.type === 'celebration' && (
            <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
              <p className="text-sm text-pink-800">
                <strong>Join us!</strong> Everyone is invited to this celebration.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 rounded-b-xl">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
