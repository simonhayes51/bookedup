import { useState } from 'react';
import {
  Upload,
  Image as ImageIcon,
  Video,
  Music,
  Sparkles,
  Star,
  MapPin,
  Users,
  Clock,
  DollarSign,
  Save,
  Eye,
  TrendingUp,
  Award,
  Plus,
  Trash2,
  Edit2,
  Play,
  Check
} from 'lucide-react';
import { Button } from '../components/ui';

const ProfileEditor = () => {
  const [activeTab, setActiveTab] = useState('basic'); // basic, media, services, seo
  const [showPreview, setShowPreview] = useState(false);

  // Profile data
  const [profile, setProfile] = useState({
    // Basic Info
    stageName: 'DJ Alex Turner',
    tagline: 'Premium Wedding & Event DJ - Making Memories Through Music',
    bio: `I'm a professional DJ with 10+ years of experience creating unforgettable moments at weddings, corporate events, and private parties.

My approach blends reading the crowd with seamless mixing, ensuring your dance floor stays packed all night long. With a library of 50,000+ tracks across all genres and decades, I can cater to any musical taste.

Specialising in weddings, I work closely with couples to create the perfect soundtrack for their special day, from ceremony to last dance.`,
    location: 'London & South East',
    yearsExperience: 10,
    eventsPerformed: 650,

    // Contact & Social
    email: 'alex@djturner.co.uk',
    phone: '07700 900123',
    website: 'www.djturner.co.uk',
    instagram: '@djturner',
    facebook: 'DJAlexTurner',

    // Services
    genres: ['House', 'Top 40', 'RnB', '80s/90s', 'Classic Rock', 'Jazz'],
    eventTypes: ['Weddings', 'Corporate Events', 'Private Parties', 'Festivals'],
    equipment: ['Professional DJ Setup', 'Premium Sound System', 'Lighting Rig', 'Wireless Mics', 'Photo Booth'],

    // Pricing
    startingPrice: 350,
    averageBookingValue: 550,

    // Media
    profilePhoto: '/images/profile-placeholder.jpg',
    coverPhoto: '/images/cover-placeholder.jpg',
    gallery: [
      { id: 1, type: 'image', url: '/images/gig1.jpg', caption: 'Wedding at The Savoy' },
      { id: 2, type: 'image', url: '/images/gig2.jpg', caption: 'Corporate Event' },
      { id: 3, type: 'video', url: '/videos/showreel.mp4', caption: 'Showreel 2025' }
    ],

    // SEO Keywords
    keywords: ['wedding dj london', 'corporate event dj', 'party dj hire', 'professional dj'],

    // Achievements
    badges: ['Verified', 'Top Rated', '500+ Events', 'Quick Responder']
  });

  const [contentScore, setContentScore] = useState({
    overall: 87,
    completeness: 92,
    seoStrength: 85,
    mediaQuality: 90,
    suggestions: [
      'Add 2 more videos to increase engagement by 45%',
      'Include "best wedding DJ" in your bio for better SEO',
      'Add testimonial quotes to boost credibility',
      'Upload high-res photos (current: 1080p, recommended: 4K)'
    ]
  });

  const tabs = [
    { id: 'basic', name: 'Basic Info', icon: Users },
    { id: 'media', name: 'Media & Portfolio', icon: ImageIcon },
    { id: 'services', name: 'Services & Pricing', icon: DollarSign },
    { id: 'seo', name: 'SEO & Visibility', icon: TrendingUp }
  ];

  const aiSuggestions = {
    tagline: [
      'Creating Unforgettable Moments - Your Soundtrack to Success',
      'Award-Winning DJ | 650+ Perfect Events | Zero Empty Dance Floors',
      'From First Dance to Last Call - Your Ultimate Party Partner'
    ],
    bio: [
      'Add more emotional language: "unforgettable", "magical", "perfect"',
      'Include a client testimonial quote',
      'Mention your unique selling point (e.g., "only DJ in London with X")',
      'Add call-to-action at the end'
    ]
  };

  const performanceStats = {
    profileViews: 2847,
    viewsGrowth: 23,
    enquiries: 156,
    enquiriesGrowth: 18,
    conversionRate: 26.9,
    searchRanking: 7,
    competitorAverage: 15
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Profile Editor</h1>
              <p className="text-gray-600">Create a profile that converts browsers into bookings</p>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => setShowPreview(!showPreview)}>
                <Eye className="w-5 h-5 mr-2" />
                {showPreview ? 'Hide Preview' : 'Preview'}
              </Button>
              <Button>
                <Save className="w-5 h-5 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>

        {/* Content Score Card */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg p-6 mb-8 text-white">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Profile Strength Score</h2>
              <p className="text-purple-100">Your profile is performing better than 73% of DJs</p>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold">{contentScore.overall}%</div>
              <div className="text-sm text-purple-200">Excellent</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-sm text-purple-100 mb-1">Completeness</div>
              <div className="text-2xl font-bold">{contentScore.completeness}%</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-sm text-purple-100 mb-1">SEO Strength</div>
              <div className="text-2xl font-bold">{contentScore.seoStrength}%</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-sm text-purple-100 mb-1">Media Quality</div>
              <div className="text-2xl font-bold">{contentScore.mediaQuality}%</div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5" />
              <div className="font-semibold">AI Suggestions to Reach 95%+</div>
            </div>
            <div className="space-y-2 text-sm">
              {contentScore.suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-300 mt-1.5 flex-shrink-0"></div>
                  <div>{suggestion}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
            <div className="text-gray-600 text-sm mb-1">Profile Views</div>
            <div className="text-3xl font-bold text-gray-900">{performanceStats.profileViews.toLocaleString()}</div>
            <div className="text-sm text-green-600 font-semibold mt-1">
              ↑ {performanceStats.viewsGrowth}% this month
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
            <div className="text-gray-600 text-sm mb-1">Enquiries</div>
            <div className="text-3xl font-bold text-gray-900">{performanceStats.enquiries}</div>
            <div className="text-sm text-green-600 font-semibold mt-1">
              ↑ {performanceStats.enquiriesGrowth}% this month
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
            <div className="text-gray-600 text-sm mb-1">Conversion Rate</div>
            <div className="text-3xl font-bold text-purple-600">{performanceStats.conversionRate}%</div>
            <div className="text-sm text-gray-500 mt-1">
              Industry avg: 18%
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
            <div className="text-gray-600 text-sm mb-1">Search Ranking</div>
            <div className="text-3xl font-bold text-green-600">#{performanceStats.searchRanking}</div>
            <div className="text-sm text-gray-500 mt-1">
              Competitor avg: #{performanceStats.competitorAverage}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden">
          <div className="flex border-b-2 border-gray-200">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-semibold transition-colors ${
                    activeTab === tab.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.name}
                </button>
              );
            })}
          </div>

          <div className="p-8">
            {/* Basic Info Tab */}
            {activeTab === 'basic' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Stage Name / Artist Name *
                    </label>
                    <input
                      type="text"
                      value={profile.stageName}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                      placeholder="Your professional name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        value={profile.location}
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                        placeholder="City or region"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Tagline (Appears below your name) *
                    </label>
                    <button className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700 font-semibold">
                      <Sparkles className="w-4 h-4" />
                      AI Suggestions
                    </button>
                  </div>
                  <input
                    type="text"
                    value={profile.tagline}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                    placeholder="One-line pitch that makes clients want to book you"
                  />
                  <div className="mt-3 bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                    <div className="text-sm font-semibold text-blue-900 mb-2">💡 AI Generated Taglines:</div>
                    <div className="space-y-2">
                      {aiSuggestions.tagline.map((suggestion, index) => (
                        <button
                          key={index}
                          className="block w-full text-left text-sm text-blue-800 hover:text-blue-900 hover:bg-blue-100 px-3 py-2 rounded transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Biography (Tell your story) *
                    </label>
                    <button className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700 font-semibold">
                      <Sparkles className="w-4 h-4" />
                      Optimize with AI
                    </button>
                  </div>
                  <textarea
                    value={profile.bio}
                    rows={8}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                    placeholder="Share your experience, style, what makes you unique..."
                  />
                  <div className="mt-2 text-sm text-gray-500">
                    {profile.bio.length} characters • Aim for 300-500 for best engagement
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Years of Experience
                    </label>
                    <input
                      type="number"
                      value={profile.yearsExperience}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Events Performed
                    </label>
                    <input
                      type="number"
                      value={profile.eventsPerformed}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Media & Portfolio Tab */}
            {activeTab === 'media' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Profile Photos</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Profile Photo
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-500 transition-colors cursor-pointer">
                        <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <div className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</div>
                        <div className="text-xs text-gray-500">Square image, min 800x800px</div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Cover Photo
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-500 transition-colors cursor-pointer">
                        <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <div className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</div>
                        <div className="text-xs text-gray-500">Landscape, min 1920x600px</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Media Gallery</h3>
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Media
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {profile.gallery.map((item) => (
                      <div
                        key={item.id}
                        className="relative group bg-gray-100 rounded-lg overflow-hidden aspect-video"
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          {item.type === 'video' ? (
                            <Play className="w-12 h-12 text-white drop-shadow-lg" />
                          ) : (
                            <ImageIcon className="w-12 h-12 text-gray-400" />
                          )}
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                          <div className="text-white text-sm font-semibold">{item.caption}</div>
                        </div>
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                          <button className="p-2 bg-white rounded-lg hover:bg-gray-100">
                            <Edit2 className="w-4 h-4 text-gray-700" />
                          </button>
                          <button className="p-2 bg-white rounded-lg hover:bg-red-50">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-purple-500 transition-colors cursor-pointer">
                    <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <div className="text-lg font-semibold text-gray-700 mb-2">
                      Upload Photos & Videos
                    </div>
                    <div className="text-sm text-gray-500 mb-4">
                      Drag and drop files here, or click to browse
                    </div>
                    <div className="text-xs text-gray-400">
                      Supports: JPG, PNG, GIF, MP4, MOV • Max file size: 100MB
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-purple-800">
                      <strong>Pro Tip:</strong> Profiles with 5+ photos and 2+ videos get 3.5x more enquiries.
                      Include action shots from events, equipment photos, and a professional showreel.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Services & Pricing Tab */}
            {activeTab === 'services' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Genres / Music Styles
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {profile.genres.map((genre, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold flex items-center gap-2"
                      >
                        {genre}
                        <button className="hover:text-purple-900">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Add a genre and press Enter"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Event Types You Perform At
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {profile.eventTypes.map((type, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold flex items-center gap-2"
                      >
                        {type}
                        <button className="hover:text-blue-900">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Add an event type and press Enter"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Equipment & What's Included
                  </label>
                  <div className="space-y-2 mb-3">
                    {profile.equipment.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-green-600" />
                          <span className="text-gray-900">{item}</span>
                        </div>
                        <button className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Add equipment item and press Enter"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Starting Price (From)
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="number"
                        value={profile.startingPrice}
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      Display your lowest package price to attract budget-conscious clients
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Average Booking Value
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="number"
                        value={profile.averageBookingValue}
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      Helps us show you to clients with appropriate budgets
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SEO & Visibility Tab */}
            {activeTab === 'seo' && (
              <div className="space-y-6">
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
                  <div className="flex items-start gap-3 mb-4">
                    <TrendingUp className="w-6 h-6 text-blue-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-blue-900 mb-2">SEO Optimization</h3>
                      <p className="text-sm text-blue-800">
                        Optimize your profile to appear higher in search results both on BookedUp and Google.
                        Better SEO = More views = More bookings.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Search Keywords
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {profile.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold flex items-center gap-2"
                      >
                        {keyword}
                        <button className="hover:text-green-900">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Add keywords people search for (e.g., 'wedding dj london')"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none mb-3"
                  />
                  <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                    <div className="text-sm font-semibold text-green-900 mb-2">🔍 Recommended Keywords:</div>
                    <div className="flex flex-wrap gap-2">
                      {['best dj london', 'wedding entertainment uk', 'professional party dj', 'dj hire near me'].map((keyword, index) => (
                        <button
                          key={index}
                          className="px-3 py-1 bg-white border-2 border-green-300 text-green-700 rounded-full text-sm hover:bg-green-100 transition-colors"
                        >
                          + {keyword}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-4">Current Rankings</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">"wedding dj london"</div>
                        <div className="font-bold text-green-600">#3</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">"corporate event dj"</div>
                        <div className="font-bold text-yellow-600">#12</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">"party dj hire"</div>
                        <div className="font-bold text-green-600">#5</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">"professional dj"</div>
                        <div className="font-bold text-red-600">#28</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-4">Visibility Metrics</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-sm text-gray-600">Profile Completeness</div>
                          <div className="font-bold text-gray-900">92%</div>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-green-500 to-green-600" style={{ width: '92%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-sm text-gray-600">Keyword Optimization</div>
                          <div className="font-bold text-gray-900">85%</div>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-yellow-500 to-yellow-600" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-sm text-gray-600">Media Quality</div>
                          <div className="font-bold text-gray-900">78%</div>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-orange-500 to-orange-600" style={{ width: '78%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Save Banner */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 p-4 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="text-sm text-gray-600">
              You have unsaved changes
            </div>
            <div className="flex gap-3">
              <Button variant="secondary">Discard</Button>
              <Button>
                <Save className="w-5 h-5 mr-2" />
                Save & Publish Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditor;
