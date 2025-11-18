import { useState } from 'react';
import {
  Target,
  TrendingUp,
  Users,
  DollarSign,
  Star,
  Zap,
  AlertCircle,
  Check,
  X,
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Clock,
  Award,
  Filter,
  Search,
  Download,
  BarChart3,
  Brain
} from 'lucide-react';
import { Button } from '../components/ui';

const LeadManagement = () => {
  const [selectedView, setSelectedView] = useState('all'); // all, hot, warm, cold
  const [filterBudget, setFilterBudget] = useState('all');
  const [filterEventType, setFilterEventType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Lead stats
  const stats = {
    totalLeads: 156,
    hotLeads: 24,
    warmLeads: 68,
    coldLeads: 48,
    converted: 16,
    avgLeadScore: 67,
    conversionRate: 26.9,
    avgResponseTime: '1.2hrs',
    totalPotentialRevenue: 48750
  };

  // Lead scoring factors (what makes a good lead)
  const scoringFactors = [
    { factor: 'Event is 2-6 months away', points: '+15 points', impact: 'high' },
    { factor: 'Budget matches your pricing', points: '+20 points', impact: 'high' },
    { factor: 'Wedding or corporate event', points: '+15 points', impact: 'high' },
    { factor: 'Detailed message (30+ words)', points: '+10 points', impact: 'medium' },
    { factor: 'Verified email/phone', points: '+10 points', impact: 'medium' },
    { factor: 'Previous customer referral', points: '+25 points', impact: 'high' },
    { factor: 'Mentioned specific songs/style', points: '+10 points', impact: 'medium' },
    { factor: 'Local to you (<20 miles)', points: '+5 points', impact: 'low' },
    { factor: 'Weekend event', points: '+5 points', impact: 'low' },
    { factor: 'Profile viewed 3+ times', points: '+15 points', impact: 'medium' }
  ];

  // Leads data with AI scoring
  const [leads, setLeads] = useState([
    {
      id: 1,
      leadScore: 92,
      temperature: 'hot',
      clientName: 'Emma Wilson',
      clientEmail: 'emma.w@gmail.com',
      clientPhone: '07700 123456',
      eventType: 'Anniversary Party',
      eventDate: '2025-12-28',
      budget: 450,
      location: 'Birmingham',
      distance: 8,
      guests: 60,
      message: 'Hi! Looking for a DJ for our 25th wedding anniversary. We love 70s/80s music and want a mix of disco and classic rock. Saw your profile and love your style! Can you accommodate? We\'re also interested in the photo booth add-on.',
      receivedAt: '2 hours ago',
      profileViews: 4,
      responseDeadline: '46 hours',
      aiInsights: [
        'High-quality lead - detailed requirements',
        'Budget matches your Silver package perfectly',
        'Mentioned specific music preferences (easier to convert)',
        'Local event - low travel cost',
        'Viewed your profile 4 times (high interest)'
      ],
      recommendedAction: 'Send personalized quote within 2 hours for best conversion',
      conversionProbability: 87,
      estimatedValue: 650, // With add-ons
      source: 'Direct Search',
      tags: ['High Budget', 'Local', 'Detailed', 'Repeat Viewer']
    },
    {
      id: 2,
      leadScore: 78,
      temperature: 'warm',
      clientName: 'David Chen',
      clientEmail: 'david.c@techcorp.com',
      clientPhone: '07700 234567',
      eventType: 'Corporate Event',
      eventDate: '2026-02-14',
      budget: 800,
      location: 'Manchester',
      distance: 45,
      guests: 150,
      message: 'Need a professional DJ for our company Valentine\'s Day party. About 150 people. Looking for someone with corporate event experience. What are your rates?',
      receivedAt: '5 hours ago',
      profileViews: 2,
      responseDeadline: '43 hours',
      aiInsights: [
        'Corporate event - typically higher budget',
        'Event is 3 months away (ideal booking window)',
        'Company domain email (verified business)',
        'Large guest count - upsell opportunity'
      ],
      recommendedAction: 'Emphasize corporate experience, send Gold package quote',
      conversionProbability: 71,
      estimatedValue: 950,
      source: 'Corporate Search',
      tags: ['Corporate', 'High Value', 'Business Email']
    },
    {
      id: 3,
      leadScore: 64,
      temperature: 'warm',
      clientName: 'Sophie Taylor',
      clientEmail: 'sophie.taylor@email.com',
      clientPhone: null,
      eventType: 'Wedding',
      eventDate: '2026-08-15',
      budget: 750,
      location: 'London',
      distance: 2,
      guests: 100,
      message: 'Looking for wedding DJ. August 2026. Budget around £750. Let me know availability.',
      receivedAt: '1 day ago',
      profileViews: 1,
      responseDeadline: '23 hours',
      aiInsights: [
        'Wedding - high value event type',
        'Good budget for standard wedding package',
        'Far in advance (10 months) - may shop around',
        'Brief message - may be mass enquiry'
      ],
      recommendedAction: 'Stand out with personalized wedding experience, include testimonials',
      conversionProbability: 58,
      estimatedValue: 750,
      source: 'Google Search',
      tags: ['Wedding', 'Long Lead Time']
    },
    {
      id: 4,
      leadScore: 42,
      temperature: 'cold',
      clientName: 'Mike Johnson',
      clientEmail: 'mike.j@email.com',
      clientPhone: null,
      eventType: 'Birthday Party',
      eventDate: '2025-11-25',
      budget: 200,
      location: 'Leeds',
      distance: 180,
      guests: 30,
      message: 'How much for small birthday party next week?',
      receivedAt: '2 days ago',
      profileViews: 1,
      responseDeadline: '4 hours',
      aiInsights: [
        'Very short notice (next week) - rushed decision',
        'Low budget below your minimum',
        'Far from your location (180 miles)',
        'Brief message - likely price shopping'
      ],
      recommendedAction: 'Politely decline or quote Bronze package at minimum',
      conversionProbability: 18,
      estimatedValue: 200,
      source: 'Price Comparison Site',
      tags: ['Low Budget', 'Far Distance', 'Short Notice']
    },
    {
      id: 5,
      leadScore: 88,
      temperature: 'hot',
      clientName: 'Rachel & Tom Anderson',
      clientEmail: 'rachel.anderson@gmail.com',
      clientPhone: '07700 345678',
      eventType: 'Wedding',
      eventDate: '2026-06-20',
      budget: 1200,
      location: 'London',
      distance: 5,
      guests: 180,
      message: 'Hi Alex! We were referred to you by Sarah & John (you DJed their wedding in November). We loved what we saw in their photos/videos! We\'re getting married June 2026 and would love to have you. Budget is flexible around £1200. Can we schedule a call to discuss?',
      receivedAt: '3 hours ago',
      profileViews: 5,
      responseDeadline: '45 hours',
      aiInsights: [
        'REFERRAL - highest quality lead type',
        'Saw your work at previous event (social proof)',
        'Excellent budget for premium package',
        'Wants to schedule call (serious intent)',
        'Viewed profile 5 times (very interested)'
      ],
      recommendedAction: 'PRIORITY - Respond immediately, offer call within 24hrs',
      conversionProbability: 94,
      estimatedValue: 1350,
      source: 'Referral (Sarah & John)',
      tags: ['Referral', 'High Budget', 'Local', 'High Interest', 'Previous Client']
    }
  ]);

  const getTemperatureColor = (temp) => {
    const colors = {
      hot: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300', icon: 'text-red-600' },
      warm: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300', icon: 'text-yellow-600' },
      cold: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300', icon: 'text-blue-600' }
    };
    return colors[temp] || colors.warm;
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-gray-600';
  };

  const filteredLeads = leads.filter(lead => {
    if (selectedView !== 'all' && lead.temperature !== selectedView) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Brain className="w-10 h-10 text-purple-400" />
                <h1 className="text-4xl font-bold text-white">AI Lead Scoring & CRM</h1>
              </div>
              <p className="text-gray-600">Focus on high-quality leads, close more deals</p>
            </div>
            <Button>
              <Download className="w-5 h-5 mr-2" />
              Export Leads
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-600 text-sm">Total Leads</div>
              <Users className="w-5 h-5 text-gray-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{stats.totalLeads}</div>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-300 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-red-700 text-sm font-semibold">Hot Leads</div>
              <Zap className="w-5 h-5 text-red-600" />
            </div>
            <div className="text-3xl font-bold text-red-600">{stats.hotLeads}</div>
            <div className="text-xs text-red-600 mt-1">80%+ score</div>
          </div>

          <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-600 text-sm">Conversion Rate</div>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-green-600">{stats.conversionRate}%</div>
            <div className="text-xs text-gray-500 mt-1">Industry avg: 18%</div>
          </div>

          <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-600 text-sm">Avg Lead Score</div>
              <Target className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-purple-600">{stats.avgLeadScore}</div>
          </div>

          <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-600 text-sm">Potential Value</div>
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600">£{stats.totalPotentialRevenue.toLocaleString()}</div>
          </div>
        </div>

        {/* AI Scoring Explanation */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg p-6 mb-8 text-white">
          <div className="flex items-start gap-4 mb-4">
            <Brain className="w-8 h-8 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">How AI Lead Scoring Works</h3>
              <p className="text-purple-100 text-sm mb-4">
                Our AI analyzes 50+ data points to predict which leads are most likely to book.
                Focus your time on leads with the highest conversion probability.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {scoringFactors.slice(0, 6).map((item, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-start justify-between mb-1">
                  <div className="text-sm">{item.factor}</div>
                  <div className={`text-xs font-bold px-2 py-0.5 rounded ${
                    item.impact === 'high' ? 'bg-red-500' :
                    item.impact === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}>
                    {item.points}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Temperature Filters */}
        <div className="bg-white rounded-lg p-6 border-2 border-gray-200 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button
              onClick={() => setSelectedView('all')}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedView === 'all'
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-2xl font-bold text-gray-900">{stats.totalLeads}</div>
              <div className="text-sm text-gray-600">All Leads</div>
            </button>

            <button
              onClick={() => setSelectedView('hot')}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedView === 'hot'
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2 justify-center mb-1">
                <Zap className="w-5 h-5 text-red-600" />
                <div className="text-2xl font-bold text-red-600">{stats.hotLeads}</div>
              </div>
              <div className="text-sm text-red-700 font-semibold">Hot (80-100)</div>
            </button>

            <button
              onClick={() => setSelectedView('warm')}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedView === 'warm'
                  ? 'border-yellow-500 bg-yellow-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-2xl font-bold text-yellow-600">{stats.warmLeads}</div>
              <div className="text-sm text-yellow-700 font-semibold">Warm (50-79)</div>
            </button>

            <button
              onClick={() => setSelectedView('cold')}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedView === 'cold'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-2xl font-bold text-blue-600">{stats.coldLeads}</div>
              <div className="text-sm text-blue-700 font-semibold">Cold (0-49)</div>
            </button>
          </div>
        </div>

        {/* Leads List */}
        <div className="space-y-6">
          {filteredLeads.sort((a, b) => b.leadScore - a.leadScore).map((lead) => {
            const tempColors = getTemperatureColor(lead.temperature);

            return (
              <div
                key={lead.id}
                className={`bg-white rounded-lg p-6 border-2 ${tempColors.border} hover:shadow-xl transition-all`}
              >
                {/* Lead Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{lead.clientName}</h3>
                      <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border-2 ${tempColors.bg} ${tempColors.text} ${tempColors.border}`}>
                        {lead.temperature === 'hot' && <Zap className="w-3 h-3" />}
                        {lead.temperature.toUpperCase()}
                      </div>
                      {lead.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-semibold">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {lead.clientEmail}
                      </div>
                      {lead.clientPhone && (
                        <div className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {lead.clientPhone}
                        </div>
                      )}
                      <div className="text-gray-400">•</div>
                      <div>Received {lead.receivedAt}</div>
                    </div>
                  </div>

                  {/* Lead Score */}
                  <div className="text-center">
                    <div className={`text-5xl font-bold ${getScoreColor(lead.leadScore)}`}>
                      {lead.leadScore}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Lead Score</div>
                    <div className="text-xs text-purple-600 font-semibold mt-1">
                      {lead.conversionProbability}% conversion
                    </div>
                  </div>
                </div>

                {/* Event Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                  <div className="flex items-start gap-2">
                    <Calendar className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs text-gray-500">Event Type</div>
                      <div className="font-semibold text-gray-900">{lead.eventType}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Clock className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs text-gray-500">Event Date</div>
                      <div className="font-semibold text-gray-900">
                        {new Date(lead.eventDate).toLocaleDateString('en-GB')}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <MapPin className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs text-gray-500">Location</div>
                      <div className="font-semibold text-gray-900">{lead.location} ({lead.distance}mi)</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <DollarSign className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs text-gray-500">Budget</div>
                      <div className="font-semibold text-green-600">£{lead.budget}</div>
                      <div className="text-xs text-gray-500">Est: £{lead.estimatedValue}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Users className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs text-gray-500">Guests</div>
                      <div className="font-semibold text-gray-900">{lead.guests} people</div>
                    </div>
                  </div>
                </div>

                {/* Client Message */}
                <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 mb-4">
                  <div className="text-xs text-gray-500 font-semibold mb-2">Client Message:</div>
                  <p className="text-gray-800">{lead.message}</p>
                </div>

                {/* AI Insights */}
                <div className={`${tempColors.bg} border-2 ${tempColors.border} rounded-lg p-4 mb-4`}>
                  <div className="flex items-center gap-2 mb-3">
                    <Brain className={`w-5 h-5 ${tempColors.icon}`} />
                    <div className={`font-semibold ${tempColors.text}`}>AI Insights</div>
                  </div>
                  <div className="space-y-1.5">
                    {lead.aiInsights.map((insight, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm">
                        <div className={`w-1.5 h-1.5 rounded-full ${tempColors.icon} bg-current mt-1.5 flex-shrink-0`}></div>
                        <div className={tempColors.text}>{insight}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommended Action */}
                <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-purple-900 mb-1">Recommended Action:</div>
                      <div className="text-sm text-purple-800">{lead.recommendedAction}</div>
                    </div>
                  </div>
                </div>

                {/* Response Deadline */}
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-yellow-800">
                    <AlertCircle className="w-4 h-4" />
                    <span className="font-semibold">Respond within {lead.responseDeadline}</span>
                    <span>• {lead.profileViews} profile views</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  <Button>
                    <Check className="w-4 h-4 mr-2" />
                    Accept & Quote
                  </Button>
                  <Button variant="secondary">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Use AI Smart Reply
                  </Button>
                  <Button variant="secondary">
                    <Phone className="w-4 h-4 mr-2" />
                    Schedule Call
                  </Button>
                  <Button variant="secondary">
                    <Calendar className="w-4 h-4 mr-2" />
                    Check Availability
                  </Button>
                  <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors font-semibold text-sm">
                    <X className="w-4 h-4 inline mr-2" />
                    Decline
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tips */}
        <div className="mt-8 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg p-6 text-white">
          <h3 className="text-xl font-bold mb-4">💡 Lead Conversion Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>✓ Respond to hot leads within 2 hours:</strong> 87% conversion vs 34% after 24hrs
            </div>
            <div>
              <strong>✓ Personalize every response:</strong> Use client's name and reference their message
            </div>
            <div>
              <strong>✓ Focus on high-score leads first:</strong> 80+ score converts at 3x rate
            </div>
            <div>
              <strong>✓ Decline low-quality leads politely:</strong> Saves time for better opportunities
            </div>
            <div>
              <strong>✓ Ask qualifying questions:</strong> Budget, date flexibility, music preferences
            </div>
            <div>
              <strong>✓ Include social proof:</strong> Mention similar events you've done successfully
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadManagement;
