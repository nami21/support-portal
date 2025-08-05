import React from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Plus } from 'lucide-react';
import { AddEventModal } from './AddEventModal';

function getEventTypeColor(type: string) {
  switch (type) {
    case 'meeting': return 'bg-grey-600';
    case 'holiday': return 'bg-grey-500';
    case 'task': return 'bg-grey-700';
    default: return 'bg-grey-400';
  }
}

export const CalendarWidget = ({ 
  events = [], 
  onEventClick,
  onAddEvent 
}) => {
  const [isAddEventModalOpen, setIsAddEventModalOpen] = React.useState(false);
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  const [showEventDetails, setShowEventDetails] = React.useState(false);
  const [localEvents, setLocalEvents] = React.useState(events);

  React.useEffect(() => {
    setLocalEvents(events);
  }, [events]);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  const getEventsForDate = (date, month, year) => {
    return localEvents.filter(event => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === date &&
        eventDate.getMonth() === month &&
        eventDate.getFullYear() === year
      );
    });
  };

const getEventTypeColor = (type: string) => {
    switch (type) {
      default:
        return 'bg-grey-800';
    }
  };
  
  const handleDateClick = (date, month, year) => {
    const dateEvents = getEventsForDate(date, month, year);
    if (dateEvents.length > 0) {
      setSelectedEvent(dateEvents[0]);
      setShowEventDetails(true);
      if (onEventClick) onEventClick(dateEvents[0]);
    }
  };

  const handleAddEvent = (event) => {
    const updatedEvents = [...localEvents, { ...event, id: Date.now() }];
    setLocalEvents(updatedEvents);
    if (onAddEvent) onAddEvent(event);
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const isToday = (date, month, year) => {
    return date === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  };

  const calendarDays = [];
  for (let i = firstDayWeekday - 1; i >= 0; i--) {
    const date = daysInPrevMonth - i;
    const prevMonthDate = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    calendarDays.push({ date, month: prevMonthDate, year: prevYear, isCurrentMonth: false, isToday: false });
  }
  for (let date = 1; date <= daysInMonth; date++) {
    calendarDays.push({ date, month: currentMonth, year: currentYear, isCurrentMonth: true, isToday: isToday(date, currentMonth, currentYear) });
  }
  const remainingCells = 42 - calendarDays.length;
  for (let date = 1; date <= remainingCells; date++) {
    const nextMonthDate = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    calendarDays.push({ date, month: nextMonthDate, year: nextYear, isCurrentMonth: false, isToday: false });
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 max-w-md mx-auto relative">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-black" />
          <h3 className="font-semibold text-gray-900">Calendar of Events</h3>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={goToPreviousMonth} className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200">
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          <button onClick={goToNextMonth} className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200">
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="text-center mb-4">
        <h4 className="text-lg font-semibold text-gray-900">
          {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h4>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map(day => (
          <div key={day} className="h-8 flex items-center justify-center text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 mb-4">
        {calendarDays.map((day, idx) => {
          const dayEvents = getEventsForDate(day.date, day.month, day.year);
          const hasEvents = dayEvents.length > 0;

          return (
            <div
              key={idx}
              onClick={() => handleDateClick(day.date, day.month, day.year)}
              className={`h-10 w-10 flex flex-col items-center justify-center text-sm rounded-lg transition-all duration-200 relative ${
                day.isToday
                  ? 'bg-black text-white font-semibold'
                  : day.isCurrentMonth
                  ? hasEvents
                    ? 'bg-grey-300 text-black hover:bg-grey-200 cursor-pointer'
                    : 'text-grey-700 hover:bg-grey-100 cursor-pointer'
                  : 'text-grey-400 hover:bg-gray-50'
              }`}
            >
              <span className="text-xs">{day.date}</span>
              {hasEvents && (
                <div className="flex gap-0.5 mt-0.5">
                  {dayEvents.slice(0, 3).map((event, i) => (
                    <div key={i} className={`w-1.5 h-1.5 rounded-full ${getEventTypeColor(event.type)}`} />
                  ))}
                  {dayEvents.length > 3 && (
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button
        onClick={() => setIsAddEventModalOpen(true)}
        className="absolute bottom-3 right-4 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:bg-grey-800 transition-all duration-200 shadow-lg hover:shadow-xl"
        title="Add new event"
      >
        <Plus className="w-4 h-4" />
      </button>

      <AddEventModal
        isOpen={isAddEventModalOpen}
        onClose={() => setIsAddEventModalOpen(false)}
        onSubmit={handleAddEvent}
      />

      {showEventDetails && selectedEvent && (
        <div className="absolute inset-0 bg-white bg-opacity-95 z-20 rounded-xl p-4 border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Event Details</h3>
            <button onClick={() => setShowEventDetails(false)} className="p-1 hover:bg-gray-100 rounded-full">
              ×
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-3 h-3 rounded-full ${getEventTypeColor(selectedEvent.type)}`}></div>
                <span className="text-sm font-medium text-gray-600 capitalize">{selectedEvent.type}</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900">{selectedEvent.title}</h4>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Date:</span>
              <p className="text-gray-800">
                {new Date(selectedEvent.date).toLocaleDateString('en-US', {
                  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                })}
              </p>
            </div>
            {selectedEvent.description && (
              <div>
                <span className="text-sm font-medium text-gray-600">Description:</span>
                <p className="text-gray-800 leading-relaxed">{selectedEvent.description}</p>
              </div>
            )}
          </div>

          {/* <button
            onClick={() => setShowEventDetails(false)}
            className="w-full mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            Close
          </button> */}
        </div>
      )}
    </div>
  );
};
