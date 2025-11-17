import { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  DollarSign,
  CheckCircle,
  AlertCircle,
  X
} from 'lucide-react';
import { Button } from '../components/ui';

const PerformerCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month'); // month, week, list
  const [showAddModal, setShowAddModal] = useState(false);

  // Sample bookings data
  const bookings = [
    {
      id: 1,
      date: new Date(2025, 10, 20),
      title: 'Wedding Reception',
      time: '18:00 - 23:00',
      location: 'The Grand Hotel, London',
      client: 'Sarah & John',
      status: 'confirmed',
      value: 850,
      deposit: 425
    },
    {
      id: 2,
      date: new Date(2025, 10, 22),
      title: 'Corporate Event',
      time: '19:00 - 22:00',
      location: 'Tech Hub, Manchester',
      client: 'TechCorp Ltd',
      status: 'pending',
      value: 650,
      deposit: 0
    },
    {
      id: 3,
      date: new Date(2025, 10, 25),
      title: 'Birthday Party',
      time: '20:00 - 00:00',
      location: 'Private Residence, Birmingham',
      client: 'Mike Thompson',
      status: 'confirmed',
      value: 450,
      deposit: 450
    },
    {
      id: 4,
      date: new Date(2025, 10, 28),
      title: 'Festival Gig',
      time: '15:00 - 16:30',
      location: 'Hyde Park, London',
      client: 'Summer Sounds Festival',
      status: 'tentative',
      value: 1200,
      deposit: 600
    }
  ];

  const blockedDates = [
    new Date(2025, 10, 15), // Holiday
    new Date(2025, 10, 16)  // Holiday
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const isDateBooked = (day) => {
    const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return bookings.some(booking =>
      booking.date.toDateString() === checkDate.toDateString()
    );
  };

  const isDateBlocked = (day) => {
    const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return blockedDates.some(blocked =>
      blocked.toDateString() === checkDate.toDateString()
    );
  };

  const getBookingForDate = (day) => {
    const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return bookings.find(booking =>
      booking.date.toDateString() === checkDate.toDateString()
    );
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700 border-green-300';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'tentative': return 'bg-blue-100 text-blue-700 border-blue-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Calendar & Availability</h1>
              <p className="text-gray-300">Manage your bookings and availability</p>
            </div>
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="w-5 h-5 mr-2" />
              Add Booking
            </Button>
          </div>

          {/* View Toggles */}
          <div className="flex gap-2">
            <button
              onClick={() => setView('month')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                view === 'month'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setView('list')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                view === 'list'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              List
            </button>
          </div>
        </div>

        {view === 'month' ? (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-200">
            {/* Calendar Header */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6">
              <div className="flex items-center justify-between">
                <button
                  onClick={previousMonth}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <h2 className="text-2xl font-bold text-white">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <button
                  onClick={nextMonth}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            {/* Day Names */}
            <div className="grid grid-cols-7 border-b-2 border-gray-200">
              {dayNames.map((day) => (
                <div
                  key={day}
                  className="p-4 text-center text-sm font-semibold text-gray-600 bg-gray-50"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7">
              {/* Empty cells for days before month starts */}
              {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                <div key={`empty-${index}`} className="p-4 border border-gray-100 bg-gray-50" />
              ))}

              {/* Days of the month */}
              {Array.from({ length: daysInMonth }).map((_, index) => {
                const day = index + 1;
                const booking = getBookingForDate(day);
                const isBlocked = isDateBlocked(day);
                const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();

                return (
                  <div
                    key={day}
                    className={`min-h-[120px] p-2 border border-gray-100 ${
                      isToday ? 'bg-purple-50' : 'bg-white hover:bg-gray-50'
                    } transition-colors relative`}
                  >
                    <div className={`text-sm font-semibold mb-1 ${
                      isToday ? 'text-purple-600' : 'text-gray-700'
                    }`}>
                      {day}
                    </div>

                    {isBlocked && (
                      <div className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded">
                        Blocked
                      </div>
                    )}

                    {booking && (
                      <div className={`text-xs p-2 rounded border-2 ${getStatusColor(booking.status)}`}>
                        <div className="font-semibold truncate">{booking.title}</div>
                        <div className="truncate">{booking.time.split(' - ')[0]}</div>
                        <div className="font-semibold mt-1">£{booking.value}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* List View */
          <div className="space-y-4">
            {bookings
              .sort((a, b) => a.date - b.date)
              .map((booking) => (
                <div key={booking.id} className="bg-white rounded-lg p-6 border-2 border-gray-200 hover:border-purple-300 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{booking.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>
                      <div className="text-gray-600">{booking.client}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600">£{booking.value}</div>
                      <div className="text-sm text-gray-500">
                        Deposit: £{booking.deposit}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center text-gray-700">
                      <CalendarIcon className="w-5 h-5 mr-2 text-purple-600" />
                      <span>{booking.date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Clock className="w-5 h-5 mr-2 text-purple-600" />
                      <span>{booking.time}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <MapPin className="w-5 h-5 mr-2 text-purple-600" />
                      <span>{booking.location}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                      View Details
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                      Message Client
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-600 text-sm mb-1">This Month</div>
                <div className="text-3xl font-bold text-gray-900">{bookings.length}</div>
              </div>
              <CalendarIcon className="w-10 h-10 text-purple-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-600 text-sm mb-1">Confirmed</div>
                <div className="text-3xl font-bold text-green-600">
                  {bookings.filter(b => b.status === 'confirmed').length}
                </div>
              </div>
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-600 text-sm mb-1">Pending</div>
                <div className="text-3xl font-bold text-yellow-600">
                  {bookings.filter(b => b.status === 'pending').length}
                </div>
              </div>
              <AlertCircle className="w-10 h-10 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-600 text-sm mb-1">Total Value</div>
                <div className="text-3xl font-bold text-purple-600">
                  £{bookings.reduce((sum, b) => sum + b.value, 0).toLocaleString()}
                </div>
              </div>
              <DollarSign className="w-10 h-10 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Add Booking Modal (placeholder) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Add New Booking</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-gray-600 mb-4">Booking form coming soon...</p>
            <Button onClick={() => setShowAddModal(false)}>Close</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformerCalendar;
