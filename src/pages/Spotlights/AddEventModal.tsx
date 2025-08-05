import React from 'react';
import { X, Calendar } from 'lucide-react';
import { CalendarEvent } from '../../types';

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (event: Omit<CalendarEvent, 'id'>) => void;
}

export const AddEventModal: React.FC<AddEventModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [date, setDate] = React.useState(new Date());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim() || undefined,
      date
    });

    setTitle('');
    setDescription('');
    setDate(new Date());
    onClose();
  };

  const formatDateForInput = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-white bg-opacity-100 z-10 rounded-xl p-4 border border-gray-200 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 border-b pb-2">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-black" />
          <h3 className="text-base font-semibold text-gray-800">Add New Event</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700">Event Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-grey-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date *</label>
          <input
            type="date"
            value={formatDateForInput(date)}
            onChange={(e) => setDate(new Date(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-grey-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-grey-500"
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm text-white bg-black hover:bg-grey-800 rounded-lg"
          >
            Add Event
          </button>
        </div>
      </form>
    </div>
  );
};