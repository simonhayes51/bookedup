import { Link } from 'react-router-dom';
import {
  BarChart3,
  Calendar,
  Package,
  MessageSquare,
  Star,
  DollarSign,
  TrendingUp,
  Eye,
  Users,
  ArrowRight,
  Zap,
  Award
} from 'lucide-react';
import { Button } from '../components/ui';

const Dashboard = () => {
  // Mock data - will connect to real API
  const stats = {
    profileViews: 2847,
    viewsChange: 23,
    enquiries: 156,
    enquiriesChange: 18,
    bookings: 42,
    bookingsChange: 12,
    revenue: 18450,
    revenueChange: 28,
    rating: 4.9,
    responseTime: '1.2hrs'
  };

  const upcomingBookings = [
    {
      id: 1,
      date: 'Nov 20, 2025',
      title: 'Wedding Reception',
      client: 'Sarah & John',
      value: 850,
      status: 'confirmed'
    },
    {
      id: 2,
      date: 'Nov 22, 2025',
      title: 'Corporate Event',
      client: 'TechCorp Ltd',
      value: 650,
      status: 'pending'
    },
    {
      id: 3,
      date: 'Nov 25, 2025',
      title: 'Birthday Party',
      client: 'Mike Thompson',
      value: 450,
      status: 'confirmed'
    }
  ];

  const recentEnquiries = [
    {
      id: 1,
      client: 'Emma Wilson',
      event: 'Anniversary Party',
      date: '2 hours ago',
      unread: true
    },
    {
      id: 2,
      client: 'David Chen',
      event: 'Corporate Christmas Party',
      date: '5 hours ago',
      unread: true
    },
    {
      id: 3,
      client: 'Sophie Taylor',
      event: 'Wedding',
      date: '1 day ago',
      unread: false
    }
  ];

  const quickActions = [
    {
      title: 'Analytics Dashboard',
      description: 'Track performance, views, and conversions',
      icon: BarChart3,
      link: '/analytics',
      color: 'purple',
      badge: 'Pro'
    },
    {
      title: 'Calendar & Bookings',
      description: 'Manage availability and upcoming events',
      icon: Calendar,
      link: '/calendar',
      color: 'blue'
    },
    {
      title: 'Package Builder',
      description: 'Create pricing tiers that sell',
      icon: Package,
      link: '/packages',
      color: 'green',
      badge: 'Pro'
    },
    {
      title: 'AI Smart Replies',
      description: 'Generate responses with 92% conversion',
      icon: Zap,
      link: '/smart-replies',
      color: 'purple',
      badge: 'Pro'
    },
    {
      title: 'Verification & Badges',
      description: 'Build trust, get +30% more bookings',
      icon: Award,
      link: '/verification',
      color: 'blue'
    },
    {
      title: 'Messages',
      description: 'Respond to client enquiries',
      icon: MessageSquare,
      link: '/messages',
      color: 'pink',
      count: 3
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome back! 👋</h1>
          <p className="text-gray-300">Here's what's happening with your bookings today</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 border-2 border-gray-200 hover:border-purple-300 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-gray-600 text-sm mb-1">Profile Views</div>
                <div className="text-3xl font-bold text-gray-900">{stats.profileViews.toLocaleString()}</div>
                <div className="text-sm text-green-600 font-semibold mt-1">
                  ↑ {stats.viewsChange}% this month
                </div>
              </div>
              <Eye className="w-10 h-10 text-purple-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border-2 border-gray-200 hover:border-blue-300 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-gray-600 text-sm mb-1">Enquiries</div>
                <div className="text-3xl font-bold text-gray-900">{stats.enquiries}</div>
                <div className="text-sm text-green-600 font-semibold mt-1">
                  ↑ {stats.enquiriesChange}% this month
                </div>
              </div>
              <MessageSquare className="w-10 h-10 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border-2 border-gray-200 hover:border-green-300 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-gray-600 text-sm mb-1">Bookings</div>
                <div className="text-3xl font-bold text-gray-900">{stats.bookings}</div>
                <div className="text-sm text-green-600 font-semibold mt-1">
                  ↑ {stats.bookingsChange}% this month
                </div>
              </div>
              <Calendar className="w-10 h-10 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border-2 border-gray-200 hover:border-yellow-300 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-gray-600 text-sm mb-1">Revenue</div>
                <div className="text-3xl font-bold text-gray-900">£{stats.revenue.toLocaleString()}</div>
                <div className="text-sm text-green-600 font-semibold mt-1">
                  ↑ {stats.revenueChange}% this month
                </div>
              </div>
              <DollarSign className="w-10 h-10 text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              const colors = {
                purple: 'from-purple-500 to-purple-700',
                blue: 'from-blue-500 to-blue-700',
                green: 'from-green-500 to-green-700',
                pink: 'from-pink-500 to-pink-700'
              };

              return (
                <Link
                  key={index}
                  to={action.link}
                  className={`bg-gradient-to-br ${colors[action.color]} rounded-lg p-6 text-white hover:scale-105 transition-transform relative overflow-hidden`}
                >
                  {action.badge && (
                    <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold">
                      {action.badge}
                    </div>
                  )}
                  {action.count && (
                    <div className="absolute top-2 right-2 bg-white text-gray-900 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                      {action.count}
                    </div>
                  )}
                  <Icon className="w-10 h-10 mb-4 opacity-90" />
                  <h3 className="text-lg font-bold mb-2">{action.title}</h3>
                  <p className="text-sm opacity-90">{action.description}</p>
                  <ArrowRight className="w-5 h-5 mt-4 opacity-75" />
                </Link>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Bookings */}
          <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Upcoming Bookings</h2>
              <Link to="/calendar" className="text-purple-600 hover:text-purple-700 text-sm font-semibold">
                View All →
              </Link>
            </div>

            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{booking.title}</div>
                    <div className="text-sm text-gray-600">{booking.client}</div>
                    <div className="text-xs text-gray-500 mt-1">{booking.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">£{booking.value}</div>
                    <div className={`text-xs px-2 py-1 rounded-full mt-1 ${
                      booking.status === 'confirmed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {booking.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {upcomingBookings.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No upcoming bookings
              </div>
            )}
          </div>

          {/* Recent Enquiries */}
          <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Enquiries</h2>
              <Link to="/messages" className="text-purple-600 hover:text-purple-700 text-sm font-semibold">
                View All →
              </Link>
            </div>

            <div className="space-y-4">
              {recentEnquiries.map((enquiry) => (
                <div
                  key={enquiry.id}
                  className={`flex items-center justify-between p-4 rounded-lg hover:bg-gray-100 transition-colors ${
                    enquiry.unread ? 'bg-purple-50' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className="font-semibold text-gray-900">{enquiry.client}</div>
                      {enquiry.unread && (
                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      )}
                    </div>
                    <div className="text-sm text-gray-600">{enquiry.event}</div>
                    <div className="text-xs text-gray-500 mt-1">{enquiry.date}</div>
                  </div>
                  <Button size="sm" variant={enquiry.unread ? 'primary' : 'outline'}>
                    Reply
                  </Button>
                </div>
              ))}
            </div>

            {recentEnquiries.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No recent enquiries
              </div>
            )}
          </div>
        </div>

        {/* Premium Features Banner */}
        <div className="mt-8 bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 rounded-lg p-8 text-white">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-6 h-6" />
                <h3 className="text-2xl font-bold">Unlock Premium Features</h3>
              </div>
              <p className="text-purple-100 mb-4 max-w-2xl">
                Get advanced analytics, smart pricing tools, unlimited packages, and priority support. Performers on Premium earn 3x more on average.
              </p>
              <div className="flex items-center gap-4">
                <Button variant="secondary" size="lg">
                  Upgrade to Premium - £29/mo
                </Button>
                <Link to="/pricing" className="text-white hover:text-purple-100 text-sm font-semibold">
                  View all plans →
                </Link>
              </div>
            </div>
            <Award className="w-24 h-24 opacity-20 hidden lg:block" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
