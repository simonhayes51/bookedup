import { Link } from 'react-router-dom';
import { Search, Shield, Clock, Star, Music, Users, TrendingUp, CheckCircle, ArrowRight, Zap, Award, Heart } from 'lucide-react';
import { Button } from '../components/ui';

const Home = () => {
  const features = [
    {
      icon: Search,
      title: 'Find the Perfect Act',
      description: 'Browse thousands of verified performers across all genres and locations',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Shield,
      title: 'Secure Bookings',
      description: 'Protected payments and contracts ensure peace of mind for everyone',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Zap,
      title: 'Instant Response',
      description: 'Get responses from performers within hours, not days',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Star,
      title: 'Verified Reviews',
      description: 'Read authentic reviews from real clients to make informed decisions',
      gradient: 'from-green-500 to-emerald-500'
    },
  ];

  const genres = [
    { name: 'DJs', icon: Music, count: '500+', color: 'purple' },
    { name: 'Bands', icon: Users, count: '300+', color: 'blue' },
    { name: 'Singers', icon: Award, count: '400+', color: 'pink' },
    { name: 'Comedy', icon: Heart, count: '150+', color: 'green' },
  ];

  const steps = [
    {
      step: 1,
      title: 'Search & Discover',
      description: 'Browse our curated selection of talented performers. Filter by genre, location, and price to find your perfect match.',
      icon: Search
    },
    {
      step: 2,
      title: 'Connect & Book',
      description: 'Message performers directly, discuss your event requirements, and receive a customized quote within hours.',
      icon: Users
    },
    {
      step: 3,
      title: 'Secure Payment',
      description: 'Book with confidence using our secure payment system. Funds are protected until your event is completed.',
      icon: Shield
    },
    {
      step: 4,
      title: 'Enjoy & Review',
      description: 'Enjoy an amazing performance at your event, then leave a review to help other clients make great choices.',
      icon: Star
    },
  ];

  const stats = [
    { number: '2,000+', label: 'Verified Performers' },
    { number: '10,000+', label: 'Events Booked' },
    { number: '4.9/5', label: 'Average Rating' },
    { number: '2hrs', label: 'Avg Response Time' },
  ];

  const testimonials = [
    {
      quote: "BookedUp made finding a DJ for our wedding so easy. Within 2 hours we had 5 quotes!",
      author: "Sarah & John",
      event: "Wedding Reception",
      rating: 5
    },
    {
      quote: "The quality of performers is outstanding. We've used BookedUp for 3 corporate events now.",
      author: "Michael Chen",
      event: "Corporate Events",
      rating: 5
    },
    {
      quote: "Love the secure payment system. No more cash handoffs or worrying about getting scammed.",
      author: "Emma Wilson",
      event: "Birthday Party",
      rating: 5
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-fade-in">
              <Star className="w-4 h-4 fill-current" />
              Trusted by 10,000+ event organizers
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 animate-slide-up">
              Book Live Entertainment
              <br />
              <span className="gradient-text">Made Incredibly Simple</span>
            </h1>

            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600 leading-relaxed">
              Connect with the UK's best performers in minutes. Secure bookings, verified reviews, and guaranteed quality for your perfect event.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/performers">
                <Button size="lg" className="btn-primary text-base px-8 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                  <Search className="w-5 h-5 mr-2" />
                  Find Performers
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/register?type=performer">
                <Button size="lg" className="btn-secondary text-base px-8 py-4 hover:shadow-lg transform hover:-translate-y-0.5 transition-all">
                  <Music className="w-5 h-5 mr-2" />
                  Join as Performer
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="group">
                  <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Why BookedUp?
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything you need in one place
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make booking entertainment simple and secure for everyone
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group card hover-lift text-center p-8 border-2 border-gray-100 hover:border-purple-200 transition-all"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Genres */}
      <section className="section bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Popular Categories
            </h2>
            <p className="text-xl text-gray-600">
              Whatever your event, we've got the perfect performer
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {genres.map((genre, index) => {
              const colorClasses = {
                purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
                blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
                pink: 'from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700',
                green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
              };

              return (
                <Link
                  key={index}
                  to={`/performers?genre=${genre.name}`}
                  className={`group relative overflow-hidden bg-gradient-to-br ${colorClasses[genre.color]} rounded-2xl p-8 text-white hover-lift transition-all shadow-lg hover:shadow-2xl`}
                >
                  <div className="relative z-10">
                    <genre.icon className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-2xl font-bold mb-2">{genre.name}</h3>
                    <p className="text-white/90 text-sm font-medium">{genre.count} performers</p>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How it works
            </h2>
            <p className="text-xl text-gray-600">
              Book your perfect performer in 4 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-full mb-6 shadow-lg">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-sm font-bold -mt-2 ml-8 shadow-md">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-purple-300 to-transparent -ml-4"></div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/how-it-works">
              <Button className="btn-primary">
                Learn More
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-gradient-to-b from-purple-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Loved by thousands
            </h2>
            <p className="text-xl text-gray-600">
              See what our customers have to say
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card-elevated p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="border-t border-gray-200 pt-4">
                  <div className="font-bold text-gray-900">{testimonial.author}</div>
                  <div className="text-sm text-gray-500">{testimonial.event}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-primary text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to book amazing entertainment?
            </h2>
            <p className="text-xl text-white/90 mb-10">
              Join thousands of happy clients who found their perfect performers on BookedUp
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/performers">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-base font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all">
                  <Search className="w-5 h-5 mr-2" />
                  Browse Performers
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" className="bg-white/10 text-white hover:bg-white/20 border-2 border-white/20 px-8 py-4 text-base font-semibold backdrop-blur-sm">
                  Sign Up Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
