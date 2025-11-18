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
  Award,
  PiggyBank,
  Edit2,
  Target,
  FileText
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
      gradient: 'from-purple-500 to-purple-600',
      badge: 'Pro'
    },
    {
      title: 'Calendar & Bookings',
      description: 'Manage availability and upcoming events',
      icon: Calendar,
      link: '/calendar',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Package Builder',
      description: 'Create pricing tiers that sell',
      icon: Package,
      link: '/packages',
      gradient: 'from-green-500 to-green-600',
      badge: 'Pro'
    },
    {
      title: 'AI Smart Replies',
      description: 'Generate responses with 92% conversion',
      icon: Zap,
      link: '/smart-replies',
      gradient: 'from-yellow-500 to-orange-500',
      badge: 'Pro'
    },
    {
      title: 'Verification & Badges',
      description: 'Build trust, get +30% more bookings',
      icon: Award,
      link: '/verification',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Financial Dashboard',
      description: 'Track income, expenses, and taxes',
      icon: PiggyBank,
      link: '/financial',
      gradient: 'from-green-500 to-emerald-600',
      badge: 'Pro'
    },
    {
      title: 'Profile Editor',
      description: 'AI-powered profile optimization',
      icon: Edit2,
      link: '/profile-editor',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Review Management',
      description: 'Showcase 248 five-star reviews',
      icon: Star,
      link: '/reviews',
      gradient: 'from-yellow-400 to-yellow-600'
    },
    {
      title: 'Client Booking Portal',
      description: 'Manage bookings & payments',
      icon: FileText,
      link: '/client-portal',
      gradient: 'from-blue-500 to-indigo-600',
      badge: 'Pro'
    },
    {
      title: 'AI Lead Scoring',
      description: 'Prioritize high-quality leads',
      icon: Target,
      link: '/leads',
      gradient: 'from-purple-600 to-purple-700',
      badge: 'Pro'
    },
    {
      title: 'Messages',
      description: 'Respond to client enquiries',
      icon: MessageSquare,
      link: '/messages',
      gradient: 'from-pink-500 to-pink-600',
      count: 3
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome back! 👋</h1>
          <p className="text-gray-300">Here's what's happening with your bookings today</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card hover-lift">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-gray-300 text-sm mb-1">Profile Views</div>
                <div className="text-3xl font-bold text-white">{stats.profileViews.toLocaleString()}</div>
                <div className="text-sm text-green-600 font-semibold mt-1">
                  ↑ {stats.viewsChange}% this month
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="card hover-lift">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-gray-300 text-sm mb-1">Enquiries</div>
                <div className="text-3xl font-bold text-white">{stats.enquiries}</div>
                <div className="text-sm text-green-600 font-semibold mt-1">
                  ↑ {stats.enquiriesChange}% this month
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="card hover-lift">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-gray-300 text-sm mb-1">Bookings</div>
                <div className="text-3xl font-bold text-white">{stats.bookings}</div>
                <div className="text-sm text-green-600 font-semibold mt-1">
                  ↑ {stats.bookingsChange}% this month
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="card hover-lift">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-gray-300 text-sm mb-1">Revenue</div>
                <div className="text-3xl font-bold text-white">£{stats.revenue.toLocaleString()}</div>
                <div className="text-sm text-green-600 font-semibold mt-1">
                  ↑ {stats.revenueChange}% this month
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;

              return (
                <Link
                  key={index}
                  to={action.link}
                  className="card hover-lift relative overflow-hidden group"
                >
                  {action.badge && (
                    <div className="absolute top-4 right-4 bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-bold">
                      {action.badge}
                    </div>
                  )}
                  {action.count && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                      {action.count}
                    </div>
                  )}
                  <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${action.gradient} rounded-xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{action.title}</h3>
                  <p className="text-sm text-gray-300 mb-4">{action.description}</p>
                  <div className="flex items-center text-purple-600 font-semibold text-sm">
                    Open
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Bookings */}
          <div className="card-elevated">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Upcoming Bookings</h2>
              <Link to="/calendar" className="text-purple-600 hover:text-purple-700 text-sm font-semibold">
                View All →
              </Link>
            </div>

            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-lg hover:bg-purple-50 transition-colors border border-gray-100"
                >
                  <div className="flex-1">
                    <div className="font-semibold text-white">{booking.title}</div>
                    <div className="text-sm text-gray-300">{booking.client}</div>
                    <div className="text-xs text-gray-500 mt-1">{booking.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-white">£{booking.value}</div>
                    <div className={`text-xs px-2 py-1 rounded-full mt-1 font-medium ${
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
          <div className="card-elevated">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Recent Enquiries</h2>
              <Link to="/messages" className="text-purple-600 hover:text-purple-700 text-sm font-semibold">
                View All →
              </Link>
            </div>

            <div className="space-y-4">
              {recentEnquiries.map((enquiry) => (
                <div
                  key={enquiry.id}
                  className={`flex items-center justify-between p-4 rounded-lg hover:bg-purple-50 transition-colors border ${
                    enquiry.unread ? 'bg-purple-50 border-purple-200' : 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-gray-100'
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className="font-semibold text-white">{enquiry.client}</div>
                      {enquiry.unread && (
                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      )}
                    </div>
                    <div className="text-sm text-gray-300">{enquiry.event}</div>
                    <div className="text-xs text-gray-500 mt-1">{enquiry.date}</div>
                  </div>
                  <Button size="sm" className={enquiry.unread ? 'btn-primary' : 'btn-secondary'}>
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
        <div className="mt-8 card-elevated bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Unlock Premium Features</h3>
              </div>
              <p className="text-gray-200 mb-6 max-w-2xl leading-relaxed">
                Get advanced analytics, smart pricing tools, unlimited packages, and priority support. Performers on Premium earn 3x more on average.
              </p>
              <div className="flex items-center gap-4">
                <Link to="/pricing">
                  <Button size="lg" className="btn-primary">
                    Upgrade to Premium - £29/mo
                  </Button>
                </Link>
                <Link to="/pricing" className="text-purple-600 hover:text-purple-700 text-sm font-semibold">
                  View all plans →
                </Link>
              </div>
            </div>
            <Award className="w-32 h-32 text-purple-200 hidden lg:block" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
