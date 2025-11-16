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
    <div className="bg-gradient-to-br from-purple-900 via-black to-purple-900 tv-static">
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-rotate border-b-8 border-black">
        <div className="absolute inset-0 bg-dots opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-wider uppercase neon-glow mb-4 bounce-wild">
              BOOK LIVE
              <br />
              ENTERTAINMENT
              <br />
              <span className="gradient-text text-6xl md:text-8xl">MADE RADICAL!</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl font-bold text-white bg-black/30 px-6 py-4 border-4 border-yellow-400 neon-border pulse-glow">
              Connect with the UK's MOST AWESOME DJs, bands, singers, and comedians! 🎸
              Perfect performances for EVERY occasion! 🎉
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/performers">
                <Button size="xl" variant="secondary" className="text-lg wiggle">
                  <Search className="w-6 h-6 mr-2 spin-slow" />
                  Find Performers
                </Button>
              </Link>
              <Link to="/register?type=performer">
                <Button size="xl" variant="neon" className="text-lg shake">
                  <Music className="w-6 h-6 mr-2 rainbow" />
                  Join as Performer
                </Button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className={`bg-black/40 border-4 border-white p-6 retro-shadow transform hover:scale-110 transition-transform ${index % 2 === 0 ? 'float' : 'bounce-wild'}`}>
                  <div className="text-4xl md:text-5xl font-black text-yellow-400 neon-glow-yellow">
                    {stat.number}
                  </div>
                  <div className="mt-2 text-sm font-bold uppercase text-white">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Genres */}
      <section className="py-16 bg-gradient-to-br from-purple-900 to-black border-y-8 border-pink-500 bg-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-black text-center gradient-text uppercase mb-12 tracking-wider wiggle">
            POPULAR CATEGORIES
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {genres.map((genre, index) => (
              <Link
                key={genre.name}
                to={`/performers?genre=${genre.name}`}
                className={`bg-gradient-to-br ${
                  index === 0 ? 'from-pink-500 to-purple-600' :
                  index === 1 ? 'from-cyan-400 to-blue-600' :
                  index === 2 ? 'from-yellow-400 to-orange-500' :
                  'from-lime-400 to-green-600'
                } border-4 border-black rounded-none p-8 text-center hover:scale-110 transition-transform retro-shadow group ${index % 2 === 0 ? 'float' : 'pulse-glow'}`}
              >
                <div className="text-6xl mb-4 bounce-wild">{genre.icon}</div>
                <h3 className="text-xl font-black text-white uppercase group-hover:text-black">
                  {genre.name}
                </h3>
                <p className="text-sm font-bold text-white mt-2 bg-black/30 px-3 py-1 neon-border">{genre.count} ACTS</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gradient-to-br from-black via-purple-900 to-black bg-zigzag">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase neon-glow tracking-wider shake">
              WHY CHOOSE BOOKEDUP?
            </h2>
            <p className="mt-4 text-xl font-bold text-cyan-400 max-w-2xl mx-auto bg-black/40 px-6 py-3 border-4 border-cyan-400 neon-border pulse-glow">
              We make booking entertainment TOTALLY EFFORTLESS and SECURE! 🔥
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className={`text-center retro-card p-6 hover:scale-110 transition-transform ${index % 2 === 0 ? 'float' : 'wiggle'}`}>
                <div className={`inline-flex items-center justify-center h-20 w-20 bg-gradient-to-br from-pink-500 to-purple-600 border-4 border-black mb-4 ${index % 2 === 0 ? 'spin-slow' : 'pulse-glow'}`}>
                  <feature.icon className="h-10 w-10 text-yellow-400" />
                </div>
                <h3 className="text-xl font-black uppercase text-black mb-3 tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-black font-bold text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-purple-900 to-black border-y-8 border-yellow-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-500 uppercase tracking-wider">
              HOW IT WORKS
            </h2>
            <p className="mt-4 text-xl font-bold text-white">
              Book your perfect performer in 4 RADICAL steps! 🚀
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((item, index) => (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-1 bg-gradient-to-r from-pink-500 to-cyan-500 -ml-4 z-0" style={{ width: 'calc(100% - 2rem)' }} />
                )}

                <div className="relative retro-card p-6 hover:scale-105 transition-transform">
                  <div className={`inline-flex items-center justify-center h-20 w-20 border-4 border-black text-3xl font-black mb-4 ${
                    index === 0 ? 'bg-pink-500' :
                    index === 1 ? 'bg-cyan-400' :
                    index === 2 ? 'bg-yellow-400' :
                    'bg-lime-400'
                  } text-black`}>
                    {item.step}
                  </div>
                  <h3 className="text-xl font-black uppercase text-black mb-3 tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-black font-bold text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Performers CTA */}
      <section className="py-20 bg-gradient-to-br from-black via-purple-900 to-black bg-dots">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="gradient-rotate border-8 border-black rounded-none overflow-hidden retro-shadow float">
            <div className="p-8 md:p-12 text-center text-white">
              <Music className="h-20 w-20 mx-auto mb-6 text-yellow-400 drop-shadow-[0_0_20px_rgba(255,255,0,0.9)] spin-slow" />
              <h2 className="text-4xl md:text-5xl font-black uppercase mb-6 neon-glow-cyan tracking-wider wiggle">
                ARE YOU A PERFORMER?
              </h2>
              <p className="text-xl font-bold text-white mb-8 max-w-2xl mx-auto bg-black/30 px-6 py-4 border-4 border-yellow-400 neon-border pulse-glow">
                Join thousands of artists getting booked for TOTALLY AWESOME events! 🎸
                Create your profile for FREE and start connecting with clients TODAY! 🔥
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-center text-lg font-bold bg-black/20 px-6 py-3 border-2 border-white neon-border float">
                  <CheckCircle className="w-6 h-6 mr-3 text-lime-400 bounce-wild" />
                  <span>FREE to join & create profile!</span>
                </div>
                <div className="flex items-center justify-center text-lg font-bold bg-black/20 px-6 py-3 border-2 border-white neon-border wiggle">
                  <CheckCircle className="w-6 h-6 mr-3 text-lime-400 bounce-wild" />
                  <span>Get discovered by THOUSANDS of clients!</span>
                </div>
                <div className="flex items-center justify-center text-lg font-bold bg-black/20 px-6 py-3 border-2 border-white neon-border pulse-glow">
                  <CheckCircle className="w-6 h-6 mr-3 text-lime-400 bounce-wild" />
                  <span>Secure payments & EASY booking management!</span>
                </div>
              </div>

              <Link to="/register?type=performer">
                <Button size="xl" variant="secondary" className="shake">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2 rainbow" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 gradient-rotate border-y-8 border-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black uppercase mb-6 gradient-text tracking-wider bounce-wild">
            READY TO BOOK AMAZING ENTERTAINMENT?
          </h2>
          <p className="text-xl font-black text-white mb-8 bg-black/30 px-6 py-4 border-4 border-black neon-border pulse-glow">
            Join THOUSANDS of satisfied clients who found their perfect performers on BookedUp! 🎉
          </p>
          <Link to="/performers">
            <Button size="xl" variant="neon" className="text-lg wiggle">
              Browse Performers Now
              <ArrowRight className="w-5 h-5 ml-2 spin-slow" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
