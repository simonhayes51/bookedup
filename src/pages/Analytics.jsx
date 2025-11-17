import { useState, useEffect } from 'react';
import {
  TrendingUp,
  Eye,
  MessageSquare,
  Calendar,
  DollarSign,
  Users,
  Star,
  Award,
  ArrowUp,
  ArrowDown,
  Target,
  Zap
} from 'lucide-react';
import { Card } from '../components/ui';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30days');
  const [loading, setLoading] = useState(true);

  // Simulated data - will connect to real API later
  const stats = {
    profileViews: { value: 2847, change: 23, trend: 'up' },
    enquiries: { value: 156, change: 18, trend: 'up' },
    bookings: { value: 42, change: 12, trend: 'up' },
    revenue: { value: 18450, change: 28, trend: 'up' },
    conversionRate: { value: 26.9, change: 3.2, trend: 'up' },
    averageBookingValue: { value: 439, change: 8, trend: 'up' },
    responseTime: { value: '1.2hrs', change: -15, trend: 'up' },
    rating: { value: 4.9, change: 0.1, trend: 'up' }
  };

  const chartData = {
    profileViews: [120, 145, 132, 189, 167, 201, 234, 256, 287, 312, 298, 347, 389, 402],
    enquiries: [8, 12, 9, 15, 13, 18, 16, 21, 19, 24, 22, 27, 25, 29],
    bookings: [2, 3, 2, 4, 3, 5, 4, 6, 5, 7, 6, 8, 7, 9]
  };

  const topPerformingContent = [
    { type: 'Video', title: 'Wedding Highlights Reel', views: 1247, enquiries: 45, thumbnail: '🎥' },
    { type: 'Photo', title: 'Corporate Event Setup', views: 892, enquiries: 32, thumbnail: '📸' },
    { type: 'Video', title: 'Live Performance Sample', views: 756, enquiries: 28, thumbnail: '🎬' }
  ];

  const competitorInsights = {
    yourPrice: 450,
    marketAverage: 385,
    marketRange: { min: 250, max: 650 },
    yourRanking: 'Top 15%',
    demandLevel: 'High'
  };

  const clientDemographics = [
    { type: 'Weddings', percentage: 45, bookings: 19, avgValue: 520 },
    { type: 'Corporate Events', percentage: 30, bookings: 13, avgValue: 680 },
    { type: 'Private Parties', percentage: 15, bookings: 6, avgValue: 320 },
    { type: 'Festivals', percentage: 10, bookings: 4, avgValue: 450 }
  ];

  const geographicData = [
    { location: 'London', views: 847, enquiries: 56, bookings: 15 },
    { location: 'Manchester', views: 456, enquiries: 28, bookings: 8 },
    { location: 'Birmingham', views: 389, enquiries: 22, bookings: 6 },
    { location: 'Leeds', views: 267, enquiries: 15, bookings: 4 }
  ];

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => setLoading(false), 800);
  }, [timeRange]);

  const StatCard = ({ icon: Icon, label, value, change, trend, prefix = '', suffix = '' }) => (
    <div className="bg-white rounded-lg p-6 border-2 border-gray-200 hover:border-purple-300 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center text-gray-600 text-sm font-medium mb-2">
            <Icon className="w-4 h-4 mr-2" />
            {label}
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
          </div>
          <div className={`flex items-center mt-2 text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {trend === 'up' ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
            <span className="font-semibold">{Math.abs(change)}%</span>
            <span className="text-gray-500 ml-1">vs last period</span>
          </div>
        </div>
        <div className={`p-3 rounded-lg ${trend === 'up' ? 'bg-green-100' : 'bg-red-100'}`}>
          <Icon className={`w-6 h-6 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading your analytics...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Analytics Dashboard</h1>
          <p className="text-gray-300">Track your performance and grow your business</p>
        </div>

        {/* Time Range Selector */}
        <div className="mb-8 flex gap-2">
          {['7days', '30days', '90days', '1year'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                timeRange === range
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {range === '7days' ? '7 Days' : range === '30days' ? '30 Days' : range === '90days' ? '90 Days' : '1 Year'}
            </button>
          ))}
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon={Eye} label="Profile Views" {...stats.profileViews} />
          <StatCard icon={MessageSquare} label="Enquiries" {...stats.enquiries} />
          <StatCard icon={Calendar} label="Bookings" {...stats.bookings} />
          <StatCard icon={DollarSign} label="Revenue" {...stats.revenue} prefix="£" />
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon={Target} label="Conversion Rate" {...stats.conversionRate} suffix="%" />
          <StatCard icon={TrendingUp} label="Avg Booking Value" {...stats.averageBookingValue} prefix="£" />
          <StatCard icon={Zap} label="Response Time" value={stats.responseTime.value} change={stats.responseTime.change} trend="up" />
          <StatCard icon={Star} label="Average Rating" {...stats.rating} />
        </div>

        {/* Performance Chart */}
        <div className="bg-white rounded-lg p-6 border-2 border-gray-200 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Performance Trends</h2>
          <div className="h-64 flex items-end justify-between gap-2">
            {chartData.profileViews.map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t transition-all hover:from-purple-700 hover:to-purple-500"
                  style={{ height: `${(value / Math.max(...chartData.profileViews)) * 100}%` }}
                  title={`${value} views`}
                />
                {index % 2 === 0 && (
                  <div className="text-xs text-gray-500">{index + 1}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Performing Content */}
          <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Top Performing Content</h2>
            <div className="space-y-4">
              {topPerformingContent.map((content, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="text-4xl">{content.thumbnail}</div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{content.title}</div>
                    <div className="text-sm text-gray-600">{content.type}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">{content.views} views</div>
                    <div className="text-sm text-green-600">{content.enquiries} enquiries</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Competitive Intelligence */}
          <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Market Position</h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Your Price</span>
                  <span className="text-2xl font-bold text-purple-600">£{competitorInsights.yourPrice}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Market Average</span>
                  <span className="font-semibold">£{competitorInsights.marketAverage}</span>
                </div>
              </div>

              <div>
                <div className="text-gray-600 text-sm mb-2">Market Range</div>
                <div className="h-3 bg-gray-200 rounded-full relative">
                  <div className="absolute h-full bg-gradient-to-r from-green-400 to-purple-600 rounded-full" style={{ width: '100%' }} />
                  <div
                    className="absolute w-1 h-6 bg-purple-600 rounded -top-1.5"
                    style={{ left: `${((competitorInsights.yourPrice - competitorInsights.marketRange.min) / (competitorInsights.marketRange.max - competitorInsights.marketRange.min)) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>£{competitorInsights.marketRange.min}</span>
                  <span>£{competitorInsights.marketRange.max}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="text-gray-600 text-sm mb-1">Your Ranking</div>
                  <div className="text-2xl font-bold text-purple-600">{competitorInsights.yourRanking}</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-gray-600 text-sm mb-1">Demand Level</div>
                  <div className="text-2xl font-bold text-green-600">{competitorInsights.demandLevel}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Client Demographics */}
        <div className="bg-white rounded-lg p-6 border-2 border-gray-200 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Client Demographics</h2>
          <div className="space-y-4">
            {clientDemographics.map((demo, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-900">{demo.type}</span>
                  <span className="text-sm text-gray-600">{demo.bookings} bookings · £{demo.avgValue} avg</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full transition-all"
                    style={{ width: `${demo.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Geographic Performance */}
        <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Geographic Performance</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">Location</th>
                  <th className="text-right py-3 px-4 text-gray-600 font-semibold">Views</th>
                  <th className="text-right py-3 px-4 text-gray-600 font-semibold">Enquiries</th>
                  <th className="text-right py-3 px-4 text-gray-600 font-semibold">Bookings</th>
                  <th className="text-right py-3 px-4 text-gray-600 font-semibold">Conversion</th>
                </tr>
              </thead>
              <tbody>
                {geographicData.map((geo, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-semibold text-gray-900">{geo.location}</td>
                    <td className="text-right py-3 px-4 text-gray-700">{geo.views}</td>
                    <td className="text-right py-3 px-4 text-gray-700">{geo.enquiries}</td>
                    <td className="text-right py-3 px-4 text-gray-700">{geo.bookings}</td>
                    <td className="text-right py-3 px-4">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-semibold">
                        {((geo.bookings / geo.views) * 100).toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
