import { Link } from 'react-router-dom';
import { Search, Shield, Clock, Star, Music, Users, Calendar, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui';

const Home = () => {
  const features = [
    {
      icon: Search,
      title: 'Find the Perfect Act',
      description: 'Browse thousands of verified performers across all genres and locations',
    },
    {
      icon: Shield,
      title: 'Secure Bookings',
      description: 'Protected payments and contracts ensure peace of mind for everyone',
    },
    {
      icon: Clock,
      title: 'Quick Response',
      description: 'Get responses from performers within 24 hours guaranteed',
    },
    {
      icon: Star,
      title: 'Verified Reviews',
      description: 'Read authentic reviews from real clients to make informed decisions',
    },
  ];

  const genres = [
    { name: 'DJs', icon: '🎧', count: '500+' },
    { name: 'Bands', icon: '🎸', count: '300+' },
    { name: 'Singers', icon: '🎤', count: '400+' },
    { name: 'Comedy', icon: '😄', count: '150+' },
  ];

  const steps = [
    {
      step: 1,
      title: 'Search & Discover',
      description: 'Browse our curated selection of talented performers. Filter by genre, location, and price to find your perfect match.',
    },
    {
      step: 2,
      title: 'Connect & Book',
      description: 'Message performers directly, discuss your event requirements, and receive a customized quote within hours.',
    },
    {
      step: 3,
      title: 'Secure Payment',
      description: 'Book with confidence using our secure payment system. Funds are protected until your event is completed.',
    },
    {
      step: 4,
      title: 'Enjoy & Review',
      description: 'Enjoy an amazing performance at your event, then leave a review to help other clients make great choices.',
    },
  ];

  const stats = [
    { number: '2,000+', label: 'Performers' },
    { number: '10,000+', label: 'Events Booked' },
    { number: '4.9/5', label: 'Average Rating' },
    { number: '24hrs', label: 'Response Time' },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-red-800">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
              Book Live Entertainment
              <br />
              <span className="text-yellow-300">Made Simple</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-red-100">
              Connect with the UK's best DJs, bands, singers, and comedians.
              Perfect performances for every occasion.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/performers">
                <Button size="xl" className="bg-white text-red-600 hover:bg-gray-100">
                  <Search className="w-5 h-5 mr-2" />
                  Find Performers
                </Button>
              </Link>
              <Link to="/register?type=performer">
                <Button size="xl" variant="outline" className="border-2 border-white text-white hover:bg-white/10">
                  <Music className="w-5 h-5 mr-2" />
                  Join as Performer
                </Button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white">
                    {stat.number}
                  </div>
                  <div className="mt-1 text-sm text-red-200">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Genres */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Popular Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {genres.map((genre) => (
              <Link
                key={genre.name}
                to={`/performers?genre=${genre.name}`}
                className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow border border-gray-200 group"
              >
                <div className="text-5xl mb-3">{genre.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-red-600">
                  {genre.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{genre.count} acts</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Why Choose BookedUp?
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              We make booking entertainment effortless and secure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                  <feature.icon className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              How It Works
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Book your perfect performer in 4 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((item, index) => (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-red-200 -ml-4" style={{ width: 'calc(100% - 2rem)' }} />
                )}

                <div className="relative bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-red-600 text-white text-2xl font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Performers CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl overflow-hidden">
            <div className="p-8 md:p-12 text-center text-white">
              <Music className="h-16 w-16 mx-auto mb-6 text-yellow-300" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Are You a Performer?
              </h2>
              <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
                Join thousands of artists getting booked for amazing events. Create your profile for free and start connecting with clients today.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center justify-center text-lg">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-300" />
                  <span>Free to join & create profile</span>
                </div>
                <div className="flex items-center justify-center text-lg">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-300" />
                  <span>Get discovered by thousands of clients</span>
                </div>
                <div className="flex items-center justify-center text-lg">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-300" />
                  <span>Secure payments & easy booking management</span>
                </div>
              </div>

              <Link to="/register?type=performer">
                <Button size="xl" className="bg-white text-red-600 hover:bg-gray-100">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Book Amazing Entertainment?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of satisfied clients who found their perfect performers on BookedUp
          </p>
          <Link to="/performers">
            <Button size="xl" className="bg-red-600 hover:bg-red-700">
              Browse Performers Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
