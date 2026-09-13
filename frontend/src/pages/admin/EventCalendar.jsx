import { useState } from 'react';
import { format, startOfWeek, addDays, startOfMonth, endOfMonth, endOfWeek, isSameMonth, isSameDay, subMonths, addMonths } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

// Mock Events
const mockEvents = [
  { id: 1, title: 'Rahul & Priya Wedding', date: new Date(), type: 'Wedding', status: 'Scheduled' },
  { id: 2, title: 'Neha Pre-Wedding', date: addDays(new Date(), 2), type: 'Pre-Wedding', status: 'Scheduled' },
  { id: 3, title: 'Arjun Engagement', date: addDays(new Date(), 5), type: 'Engagement', status: 'Scheduled' },
];

const EventCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-serif text-primary">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <div className="flex gap-2">
          <button onClick={prevMonth} className="p-2 border border-gray-200 hover:bg-gray-50 rounded-sm">
            <ChevronLeft size={16} />
          </button>
          <button onClick={nextMonth} className="p-2 border border-gray-200 hover:bg-gray-50 rounded-sm">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = "EEE";
    const days = [];
    let startDate = startOfWeek(currentDate);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center font-medium text-xs uppercase tracking-wider text-gray-500 py-3">
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="grid grid-cols-7 border-b border-gray-200">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, "d");
        const cloneDay = day;
        
        // Find events for this day
        const dayEvents = mockEvents.filter(e => isSameDay(e.date, cloneDay));

        days.push(
          <div
            key={day}
            className={`min-h-[100px] p-2 border-b border-r border-gray-100 transition-colors ${
              !isSameMonth(day, monthStart)
                ? "bg-gray-50 text-gray-300"
                : isSameDay(day, new Date()) ? "bg-secondary/5 text-primary" : "bg-white text-gray-700"
            }`}
          >
            <div className="flex justify-end">
              <span className={`text-sm ${isSameDay(day, new Date()) ? 'bg-secondary text-white w-6 h-6 rounded-full flex items-center justify-center' : ''}`}>
                {formattedDate}
              </span>
            </div>
            <div className="mt-1 space-y-1">
              {dayEvents.map(evt => (
                <div key={evt.id} className={`text-xs px-2 py-1 truncate rounded-sm ${
                  evt.type === 'Wedding' ? 'bg-purple-100 text-purple-800' :
                  evt.type === 'Pre-Wedding' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {evt.title}
                </div>
              ))}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-serif text-primary">Event Calendar</h1>
          <p className="text-gray-500 text-sm mt-1">Manage all your photography assignments.</p>
        </div>
        <button className="bg-primary text-white px-4 py-2 text-sm font-medium rounded-sm flex items-center gap-2 hover:bg-opacity-90">
          <Plus size={16} /> Schedule Event
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        {renderHeader()}
        <div className="border border-gray-200 rounded-sm overflow-hidden">
          {renderDays()}
          {renderCells()}
        </div>
      </div>
    </AdminLayout>
  );
};

export default EventCalendar;
