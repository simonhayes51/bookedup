import { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  DollarSign,
  Check,
  X,
  CreditCard,
  FileText,
  Download,
  Send,
  MessageSquare,
  Star,
  AlertCircle,
  CheckCircle,
  Package as PackageIcon,
  Music,
  Zap
} from 'lucide-react';
import { Button } from '../components/ui';

const ClientBookingPortal = () => {
  const [selectedTab, setSelectedTab] = useState('active'); // active, pending, completed, cancelled
  const [showQuickActions, setShowQuickActions] = useState(true);

  // Booking stats
  const stats = {
    activeBookings: 12,
    pendingRequests: 8,
    completedBookings: 42,
    totalRevenue: 18450,
    upcomingPayments: 4200,
    avgRating: 4.9
  };

  // Active bookings
  const activeBookings = [
    {
      id: 1,
      bookingRef: 'BK-2025-0847',
      clientName: 'Sarah Johnson',
      clientEmail: 'sarah.j@email.com',
      clientPhone: '07700 123456',
      eventType: 'Wedding Reception',
      eventDate: '2025-12-15',
      eventTime: '18:00 - 23:00',
      location: 'The Grand Hotel, London SW1A 1AA',
      guests: 120,
      packageSelected: 'Gold Package',
      packagePrice: 850,
      addOns: [
        { name: 'Photo Booth', price: 200 },
        { name: 'Extra Hour', price: 100 }
      ],
      totalPrice: 1150,
      depositPaid: 575,
      balanceDue: 575,
      balanceDueDate: '2025-12-08',
      status: 'confirmed',
      paymentStatus: 'deposit_paid',
      contractSigned: true,
      specialRequests: 'Please play "Perfect" by Ed Sheeran for first dance. Mix of 80s classics and modern pop.',
      lastContact: '2025-11-10'
    },
    {
      id: 2,
      bookingRef: 'BK-2025-0848',
      clientName: 'Michael Chen',
      clientEmail: 'm.chen@techcorp.com',
      clientPhone: '07700 234567',
      eventType: 'Corporate Christmas Party',
      eventDate: '2025-12-20',
      eventTime: '19:00 - 00:00',
      location: 'Tech Hub Manchester, M1 2AB',
      guests: 200,
      packageSelected: 'Silver Package',
      packagePrice: 650,
      addOns: [],
      totalPrice: 650,
      depositPaid: 325,
      balanceDue: 325,
      balanceDueDate: '2025-12-13',
      status: 'confirmed',
      paymentStatus: 'deposit_paid',
      contractSigned: true,
      specialRequests: 'Corporate-friendly music only. No explicit content.',
      lastContact: '2025-11-08'
    }
  ];

  // Pending requests
  const pendingRequests = [
    {
      id: 3,
      bookingRef: 'REQ-2025-0123',
      clientName: 'Emma Wilson',
      clientEmail: 'emma.w@gmail.com',
      eventType: 'Anniversary Party',
      eventDate: '2025-12-28',
      eventTime: '20:00 - 01:00',
      location: 'Private Residence, Birmingham',
      guests: 60,
      estimatedBudget: 450,
      receivedDate: '2 hours ago',
      responseDeadline: '48 hours',
      message: 'Hi! Looking for a DJ for our 25th wedding anniversary. We love 70s/80s music and want a mix of disco and classic rock. Can you accommodate?',
      leadScore: 87, // High quality lead
      priority: 'high'
    },
    {
      id: 4,
      bookingRef: 'REQ-2025-0124',
      clientName: 'David Park',
      clientEmail: 'david.p@email.com',
      eventType: 'Birthday Party',
      eventDate: '2026-01-10',
      eventTime: '19:00 - 23:00',
      location: 'London',
      guests: 40,
      estimatedBudget: 350,
      receivedDate: '5 hours ago',
      responseDeadline: '45 hours',
      message: 'Need DJ for my 30th birthday. Mostly house music and some hip-hop. What\'s your rate?',
      leadScore: 62,
      priority: 'medium'
    }
  ];

  const tabs = [
    { id: 'active', name: 'Active Bookings', count: stats.activeBookings },
    { id: 'pending', name: 'Pending Requests', count: stats.pendingRequests },
    { id: 'completed', name: 'Completed', count: stats.completedBookings },
    { id: 'cancelled', name: 'Cancelled', count: 2 }
  ];

  const getStatusBadge = (status) => {
    const badges = {
      confirmed: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300', label: 'Confirmed' },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300', label: 'Pending' },
      cancelled: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300', label: 'Cancelled' },
      completed: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300', label: 'Completed' }
    };
    const badge = badges[status] || badges.pending;
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border-2 ${badge.bg} ${badge.text} ${badge.border}`}>
        {badge.label}
      </span>
    );
  };

  const getPaymentBadge = (paymentStatus) => {
    const badges = {
      paid: { icon: CheckCircle, bg: 'bg-green-100', text: 'text-green-700', label: 'Paid in Full' },
      deposit_paid: { icon: Clock, bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Deposit Paid' },
      pending: { icon: AlertCircle, bg: 'bg-orange-100', text: 'text-orange-700', label: 'Payment Pending' }
    };
    const badge = badges[paymentStatus] || badges.pending;
    const Icon = badge.icon;
    return (
      <div className={`flex items-center gap-2 px-3 py-1 rounded-lg ${badge.bg} ${badge.text}`}>
        <Icon className="w-4 h-4" />
        <span className="text-xs font-semibold">{badge.label}</span>
      </div>
    );
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      high: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300', icon: Zap },
      medium: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300', icon: AlertCircle },
      low: { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300', icon: Clock }
    };
    const badge = badges[priority];
    const Icon = badge.icon;
    return (
      <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold border-2 ${badge.bg} ${badge.text} ${badge.border}`}>
        <Icon className="w-3 h-3" />
        {priority.toUpperCase()}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Client Booking Portal</h1>
          <p className="text-gray-600">Manage bookings, communicate with clients, and get paid</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
            <div className="text-gray-600 text-sm mb-1">Active</div>
            <div className="text-3xl font-bold text-green-600">{stats.activeBookings}</div>
          </div>

          <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
            <div className="text-gray-600 text-sm mb-1">Pending</div>
            <div className="text-3xl font-bold text-yellow-600">{stats.pendingRequests}</div>
          </div>

          <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
            <div className="text-gray-600 text-sm mb-1">Completed</div>
            <div className="text-3xl font-bold text-blue-600">{stats.completedBookings}</div>
          </div>

          <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
            <div className="text-gray-600 text-sm mb-1">Revenue</div>
            <div className="text-2xl font-bold text-purple-600">£{stats.totalRevenue.toLocaleString()}</div>
          </div>

          <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
            <div className="text-gray-600 text-sm mb-1">Upcoming</div>
            <div className="text-2xl font-bold text-green-600">£{stats.upcomingPayments.toLocaleString()}</div>
          </div>

          <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
            <div className="flex items-center gap-1 text-gray-600 text-sm mb-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              Rating
            </div>
            <div className="text-3xl font-bold text-gray-900">{stats.avgRating}</div>
          </div>
        </div>

        {/* Quick Actions */}
        {showQuickActions && (
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg p-6 mb-8 text-white">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold mb-2">⚡ Quick Actions</h3>
                <p className="text-purple-100 text-sm">Common tasks to manage your bookings</p>
              </div>
              <button onClick={() => setShowQuickActions(false)} className="text-purple-200 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-4 text-left transition-colors">
                <Send className="w-6 h-6 mb-2" />
                <div className="font-semibold">Send Payment Link</div>
                <div className="text-xs text-purple-100">Request outstanding balances</div>
              </button>

              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-4 text-left transition-colors">
                <FileText className="w-6 h-6 mb-2" />
                <div className="font-semibold">Generate Contract</div>
                <div className="text-xs text-purple-100">Create booking agreement</div>
              </button>

              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-4 text-left transition-colors">
                <MessageSquare className="w-6 h-6 mb-2" />
                <div className="font-semibold">Message Client</div>
                <div className="text-xs text-purple-100">Quick communication</div>
              </button>

              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-4 text-left transition-colors">
                <Download className="w-6 h-6 mb-2" />
                <div className="font-semibold">Export Invoices</div>
                <div className="text-xs text-purple-100">Download for accounting</div>
              </button>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden mb-8">
          <div className="flex border-b-2 border-gray-200 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-semibold whitespace-nowrap transition-colors ${
                  selectedTab === tab.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab.name}
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  selectedTab === tab.id
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Active Bookings */}
            {selectedTab === 'active' && (
              <div className="space-y-6">
                {activeBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="border-2 border-gray-200 rounded-lg p-6 hover:border-purple-300 transition-colors"
                  >
                    {/* Booking Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{booking.eventType}</h3>
                          {getStatusBadge(booking.status)}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="font-semibold">Ref: {booking.bookingRef}</span>
                          <span>•</span>
                          <span>{booking.clientName}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-purple-600">£{booking.totalPrice.toLocaleString()}</div>
                        {getPaymentBadge(booking.paymentStatus)}
                      </div>
                    </div>

                    {/* Booking Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs text-gray-500">Event Date</div>
                          <div className="font-semibold text-gray-900">
                            {new Date(booking.eventDate).toLocaleDateString('en-GB', {
                              weekday: 'short',
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs text-gray-500">Time</div>
                          <div className="font-semibold text-gray-900">{booking.eventTime}</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs text-gray-500">Location</div>
                          <div className="font-semibold text-gray-900">{booking.location}</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs text-gray-500">Guests</div>
                          <div className="font-semibold text-gray-900">{booking.guests} people</div>
                        </div>
                      </div>
                    </div>

                    {/* Package & Add-ons */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <div className="flex items-center gap-2 mb-3">
                        <PackageIcon className="w-5 h-5 text-gray-700" />
                        <div className="font-semibold text-gray-900">{booking.packageSelected}</div>
                        <div className="text-gray-600">£{booking.packagePrice}</div>
                      </div>
                      {booking.addOns.length > 0 && (
                        <div className="space-y-1">
                          <div className="text-xs text-gray-600 font-semibold">Add-ons:</div>
                          {booking.addOns.map((addon, index) => (
                            <div key={index} className="flex items-center justify-between text-sm">
                              <div className="text-gray-700">+ {addon.name}</div>
                              <div className="text-gray-600">£{addon.price}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Payment Details */}
                    {booking.balanceDue > 0 && (
                      <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 mb-4">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <div className="font-semibold text-yellow-900 mb-1">
                              Balance Due: £{booking.balanceDue.toLocaleString()}
                            </div>
                            <div className="text-sm text-yellow-800">
                              Due by {new Date(booking.balanceDueDate).toLocaleDateString('en-GB')}
                              ({Math.ceil((new Date(booking.balanceDueDate) - new Date()) / (1000 * 60 * 60 * 24))} days)
                            </div>
                          </div>
                          <Button size="sm">
                            <Send className="w-4 h-4 mr-2" />
                            Send Payment Link
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Special Requests */}
                    {booking.specialRequests && (
                      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-4">
                        <div className="flex items-start gap-3">
                          <Music className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="text-xs text-blue-600 font-semibold mb-1">Special Requests</div>
                            <div className="text-sm text-blue-800">{booking.specialRequests}</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Message Client
                      </Button>
                      <Button size="sm" variant="secondary">
                        <FileText className="w-4 h-4 mr-2" />
                        View Contract
                      </Button>
                      <Button size="sm" variant="secondary">
                        <Download className="w-4 h-4 mr-2" />
                        Download Invoice
                      </Button>
                      <Button size="sm" variant="secondary">
                        <Calendar className="w-4 h-4 mr-2" />
                        Reschedule
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pending Requests */}
            {selectedTab === 'pending' && (
              <div className="space-y-6">
                {pendingRequests.map((request) => (
                  <div
                    key={request.id}
                    className="border-2 border-yellow-300 rounded-lg p-6 bg-yellow-50"
                  >
                    {/* Request Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{request.eventType}</h3>
                          {getPriorityBadge(request.priority)}
                          <div className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                            Lead Score: {request.leadScore}%
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="font-semibold">Ref: {request.bookingRef}</span>
                          <span>•</span>
                          <span>{request.clientName}</span>
                          <span>•</span>
                          <span>Received {request.receivedDate}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-purple-600">~£{request.estimatedBudget}</div>
                        <div className="text-xs text-gray-500">Estimated budget</div>
                      </div>
                    </div>

                    {/* Request Details */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs text-gray-500">Requested Date</div>
                          <div className="font-semibold text-gray-900">
                            {new Date(request.eventDate).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs text-gray-500">Time</div>
                          <div className="font-semibold text-gray-900">{request.eventTime}</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs text-gray-500">Location</div>
                          <div className="font-semibold text-gray-900">{request.location}</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs text-gray-500">Guests</div>
                          <div className="font-semibold text-gray-900">{request.guests} people</div>
                        </div>
                      </div>
                    </div>

                    {/* Client Message */}
                    <div className="bg-white border-2 border-gray-200 rounded-lg p-4 mb-4">
                      <div className="text-xs text-gray-500 font-semibold mb-2">Client Message:</div>
                      <p className="text-gray-800">{request.message}</p>
                    </div>

                    {/* Response Deadline */}
                    <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-red-800">
                        <Clock className="w-4 h-4" />
                        <span className="font-semibold">Respond within {request.responseDeadline}</span>
                        <span>• Quick responses convert 3x better</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      <Button>
                        <Check className="w-4 h-4 mr-2" />
                        Accept & Send Quote
                      </Button>
                      <Button variant="secondary">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Ask Questions
                      </Button>
                      <Button variant="secondary">
                        <Zap className="w-4 h-4 mr-2" />
                        Use AI Smart Reply
                      </Button>
                      <button className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-semibold text-sm">
                        <X className="w-4 h-4 inline mr-2" />
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Completed/Cancelled tabs */}
            {(selectedTab === 'completed' || selectedTab === 'cancelled') && (
              <div className="text-center py-12 text-gray-500">
                <div className="text-lg font-semibold mb-2">
                  {selectedTab === 'completed' ? 'Completed Bookings' : 'Cancelled Bookings'}
                </div>
                <div className="text-sm">
                  {selectedTab === 'completed'
                    ? `You've completed ${stats.completedBookings} events - great work!`
                    : 'No cancelled bookings to show'}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientBookingPortal;
