import { useState } from 'react';
import {
  Star,
  TrendingUp,
  MessageSquare,
  Share2,
  Filter,
  Search,
  ThumbsUp,
  Award,
  AlertCircle,
  CheckCircle,
  Download,
  Heart,
  Flag,
  Reply
} from 'lucide-react';
import { Button } from '../components/ui';

const ReviewManagement = () => {
  const [filterRating, setFilterRating] = useState('all'); // all, 5, 4, 3, 2, 1
  const [filterStatus, setFilterStatus] = useState('all'); // all, responded, not_responded
  const [searchQuery, setSearchQuery] = useState('');

  // Review stats
  const stats = {
    overallRating: 4.9,
    totalReviews: 248,
    fiveStars: 228,
    fourStars: 15,
    threeStars: 3,
    twoStars: 1,
    oneStars: 1,
    responseRate: 94,
    averageResponseTime: '2.3hrs',
    recommendationRate: 98
  };

  // Review distribution
  const distribution = [
    { stars: 5, count: 228, percentage: 92 },
    { stars: 4, count: 15, percentage: 6 },
    { stars: 3, count: 3, percentage: 1 },
    { stars: 2, count: 1, percentage: 0.4 },
    { stars: 1, count: 1, percentage: 0.4 }
  ];

  // Reviews
  const [reviews, setReviews] = useState([
    {
      id: 1,
      rating: 5,
      client: 'Sarah Johnson',
      event: 'Wedding Reception',
      date: '2025-11-10',
      verified: true,
      comment: 'Alex was absolutely phenomenal! The music selection was perfect for our wedding, and he kept the dance floor packed all night. Professional, punctual, and an amazing vibe-reader. Highly recommend!',
      response: null,
      helpful: 24,
      featured: true,
      tags: ['Punctual', 'Great Music', 'Professional']
    },
    {
      id: 2,
      rating: 5,
      client: 'Michael Chen',
      event: 'Corporate Event',
      date: '2025-11-05',
      verified: true,
      comment: 'We hired Alex for our annual company party and he exceeded all expectations. The equipment was top-notch, he took requests gracefully, and the energy was incredible. Everyone was talking about how great the DJ was!',
      response: {
        text: 'Thank you so much Michael! It was an absolute pleasure being part of your celebration. Your team knows how to party! Looking forward to next year already 🎉',
        date: '2025-11-06'
      },
      helpful: 18,
      featured: true,
      tags: ['Great Equipment', 'High Energy']
    },
    {
      id: 3,
      rating: 5,
      client: 'Emma Thompson',
      event: 'Birthday Party',
      date: '2025-10-28',
      verified: true,
      comment: 'Best decision we made for my 40th! Alex played everything from 80s classics to current hits. The photo booth integration was genius. Worth every penny.',
      response: null,
      helpful: 12,
      featured: false,
      tags: ['Versatile', 'Photo Booth']
    },
    {
      id: 4,
      rating: 4,
      client: 'David Wilson',
      event: 'Private Party',
      date: '2025-10-20',
      verified: true,
      comment: 'Great DJ overall. Music was spot on and setup was professional. Only minor issue was starting 15 mins late due to traffic, but Alex stayed 15 mins extra to make up for it. Would book again.',
      response: {
        text: 'Thanks for the feedback David! I apologize for the delay - traffic was brutal that day. Glad I could extend the set to make up for it. Appreciate your understanding!',
        date: '2025-10-21'
      },
      helpful: 8,
      featured: false,
      tags: ['Professional', 'Punctuality Issue']
    },
    {
      id: 5,
      rating: 5,
      client: 'Lisa Martinez',
      event: 'Wedding',
      date: '2025-10-15',
      verified: true,
      comment: 'INCREDIBLE!!! Alex made our wedding day absolutely magical. He worked with us beforehand to understand our music taste, and the result was perfection. Our guests are still raving about it two weeks later!',
      response: null,
      helpful: 31,
      featured: true,
      tags: ['Wedding', 'Personalized', 'Outstanding']
    },
    {
      id: 6,
      rating: 3,
      client: 'John Parker',
      event: 'Anniversary Party',
      date: '2025-10-08',
      verified: false,
      comment: 'Decent performance. Music was good but felt like he could have been more interactive with the crowd. Good value for money though.',
      response: null,
      helpful: 2,
      featured: false,
      tags: ['Average']
    }
  ]);

  // Featured testimonials for marketing
  const featuredTestimonials = reviews.filter(r => r.featured);

  const getStarColor = (rating) => {
    if (rating >= 4.5) return 'text-yellow-500';
    if (rating >= 3.5) return 'text-yellow-400';
    if (rating >= 2.5) return 'text-orange-500';
    return 'text-red-500';
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? getStarColor(rating) + ' fill-current' : 'text-gray-600'
            }`}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Review Management</h1>
              <p className="text-gray-600">Build trust and showcase social proof</p>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary">
                <Download className="w-5 h-5 mr-2" />
                Export Reviews
              </Button>
              <Button>
                <Share2 className="w-5 h-5 mr-2" />
                Share Testimonials
              </Button>
            </div>
          </div>
        </div>

        {/* Overall Stats */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg p-8 mb-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                {renderStars(5)}
              </div>
              <div className="text-5xl font-bold mb-1">{stats.overallRating}</div>
              <div className="text-purple-100 text-sm">Overall Rating</div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{stats.totalReviews}</div>
              <div className="text-purple-100 text-sm mb-1">Total Reviews</div>
              <div className="text-xs text-purple-200">{stats.recommendationRate}% recommend you</div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{stats.responseRate}%</div>
              <div className="text-purple-100 text-sm mb-1">Response Rate</div>
              <div className="text-xs text-purple-200">Industry avg: 67%</div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{stats.averageResponseTime}</div>
              <div className="text-purple-100 text-sm mb-1">Avg Response Time</div>
              <div className="text-xs text-purple-200">Industry avg: 18hrs</div>
            </div>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="bg-white rounded-lg p-6 border-2 border-gray-200 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Rating Breakdown</h2>

          <div className="space-y-3">
            {distribution.map((item) => (
              <div key={item.stars} className="flex items-center gap-4">
                <div className="flex items-center gap-1 w-20">
                  <span className="font-semibold text-gray-700">{item.stars}</span>
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                </div>

                <div className="flex-1">
                  <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>

                <div className="w-16 text-right">
                  <span className="font-semibold text-gray-900">{item.count}</span>
                  <span className="text-gray-500 text-sm ml-1">({item.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t-2 border-gray-200 bg-green-50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-green-800">
                <strong>Excellent performance!</strong> You're in the top 5% of performers on BookedUp.
                {stats.fiveStars} five-star reviews is exceptional. Keep up the great work!
              </div>
            </div>
          </div>
        </div>

        {/* Featured Testimonials */}
        <div className="bg-white rounded-lg p-6 border-2 border-yellow-300 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Award className="w-6 h-6 text-yellow-600" />
              <h2 className="text-xl font-bold text-gray-900">Featured Testimonials</h2>
            </div>
            <Button size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Create Marketing Assets
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {featuredTestimonials.slice(0, 3).map((review) => (
              <div key={review.id} className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  {renderStars(review.rating)}
                  <Heart className="w-5 h-5 text-red-500 fill-current" />
                </div>
                <p className="text-gray-800 text-sm mb-3 line-clamp-3">"{review.comment}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{review.client}</div>
                    <div className="text-xs text-gray-500">{review.event}</div>
                  </div>
                  <button className="text-purple-600 hover:text-purple-700 text-xs font-semibold">
                    Use in Marketing →
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-800">
                <strong>Marketing Power:</strong> Use these testimonials on your website, social media, and in proposals.
                Featured reviews convert 2.3x better than regular reviews. Download as images or copy text directly.
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-lg p-6 border-2 border-gray-200 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search reviews..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
              />
            </div>

            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars Only</option>
              <option value="4">4 Stars Only</option>
              <option value="3">3 Stars & Below</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
            >
              <option value="all">All Reviews</option>
              <option value="responded">Responded</option>
              <option value="not_responded">Not Responded</option>
            </select>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className={`bg-white rounded-lg p-6 border-2 ${
                review.featured
                  ? 'border-yellow-300'
                  : review.response
                  ? 'border-green-200'
                  : 'border-gray-200'
              } hover:shadow-lg transition-shadow`}
            >
              {/* Review Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="font-bold text-gray-900">{review.client}</div>
                      {review.verified && (
                        <div className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-semibold">
                          ✓ Verified
                        </div>
                      )}
                      {review.featured && (
                        <Award className="w-4 h-4 text-yellow-600" />
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    {renderStars(review.rating)}
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">{review.event}</span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">{formatDate(review.date)}</span>
                  </div>

                  <p className="text-gray-800 mb-3">{review.comment}</p>

                  {/* Tags */}
                  {review.tags && review.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {review.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Response */}
                  {review.response && (
                    <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mt-4">
                      <div className="flex items-start gap-3">
                        <Reply className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <div className="font-semibold text-green-900 text-sm mb-1">Your Response</div>
                          <p className="text-green-800 text-sm mb-2">{review.response.text}</p>
                          <div className="text-xs text-green-600">{formatDate(review.response.date)}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Review Actions */}
              <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{review.helpful} found helpful</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {!review.response && (
                    <Button size="sm">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Respond
                    </Button>
                  )}
                  {!review.featured && review.rating >= 4 && (
                    <Button size="sm" variant="secondary">
                      <Award className="w-4 h-4 mr-2" />
                      Feature
                    </Button>
                  )}
                  <Button size="sm" variant="secondary">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  {review.rating <= 3 && (
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                      <Flag className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tips & Best Practices */}
        <div className="mt-8 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg p-6 text-white">
          <h3 className="text-xl font-bold mb-4">💡 Review Management Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>✓ Respond quickly:</strong> Reply to all reviews within 24hrs for best impact
            </div>
            <div>
              <strong>✓ Thank everyone:</strong> Even 5-star reviews deserve a personal thank you
            </div>
            <div>
              <strong>✓ Address issues professionally:</strong> Turn negative reviews into opportunities
            </div>
            <div>
              <strong>✓ Request reviews:</strong> Ask clients within 48hrs of event while it's fresh
            </div>
            <div>
              <strong>✓ Feature the best:</strong> Showcase top testimonials on your profile
            </div>
            <div>
              <strong>✓ Use in marketing:</strong> Share reviews on social media and website
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewManagement;
