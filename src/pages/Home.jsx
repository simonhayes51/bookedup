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
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-rotate">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Book Live Entertainment
              <br />
              <span className="gradient-text text-5xl md:text-7xl">Made Simple</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-200">
              Connect with talented performers for your events. Secure bookings, verified reviews, and guaranteed quality.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/performers">
                <Button size="lg" variant="primary">
                  <Search className="w-5 h-5 mr-2" />
                  Find Performers
                </Button>
              </Link>
              <Link to="/register?type=performer">
                <Button size="lg" variant="secondary">
                  <Music className="w-5 h-5 mr-2" />
                  Join as Performer
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl md:text-4xl font-bold text-purple-300">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-300 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose BookedUp?
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              We make booking entertainment simple and secure for everyone
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="retro-card p-6 text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-600 rounded-lg mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-700">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Genres */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Popular Categories
            </h2>
            <p className="text-lg text-gray-300">
              Find the perfect entertainment for any occasion
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {genres.map((genre, index) => (
              <Link
                key={index}
                to={`/performers?genre=${genre.name.toLowerCase()}`}
                className="retro-card p-8 text-center hover:scale-105 transition-transform"
              >
                <div className="text-5xl mb-3">{genre.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {genre.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {genre.count} performers
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-300">
              Book entertainment in four simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="retro-card-cyan p-6">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white text-xl font-bold mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-700">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/how-it-works">
              <Button size="lg" variant="primary">
                Learn More
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-rotate">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-200 mb-8">
            Join thousands of happy clients and performers on BookedUp
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/performers">
              <Button size="xl" variant="primary">
                Find Performers
              </Button>
            </Link>
            <Link to="/register">
              <Button size="xl" variant="secondary">
                Sign Up Free
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
