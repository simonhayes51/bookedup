import { Link } from 'react-router-dom';
import { Search, MessageSquare, CreditCard, Star, CheckCircle, ArrowRight, Shield, Clock, Users } from 'lucide-react';
import { Button } from '../components/ui';

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: 'Browse & Search',
      description: 'Explore our curated selection of talented performers. Use filters to find acts that match your event type, budget, and location.',
      details: [
        'Search by genre, location, and price range',
        'View detailed profiles with photos and videos',
        'Read verified reviews from real clients',
        'Check availability calendars',
      ],
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      icon: MessageSquare,
      title: 'Connect & Discuss',
      description: 'Message performers directly through our platform. Discuss your event requirements, ask questions, and get a customized quote.',
      details: [
        'Direct messaging with performers',
        'Share event details and requirements',
        'Get quotes within 24 hours',
        'No obligation to book',
      ],
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: CreditCard,
      title: 'Book & Pay Securely',
      description: 'When you find the perfect match, book with confidence using our secure payment system. Your payment is protected until the event is completed.',
      details: [
        'Secure online payment processing',
        'Payment protection guarantee',
        'Clear pricing with no hidden fees',
        'Instant booking confirmation',
      ],
      gradient: 'from-green-500 to-green-600'
    },
    {
      icon: Star,
      title: 'Enjoy & Review',
      description: 'Enjoy an amazing performance at your event. After the event, leave a review to help other clients make great booking decisions.',
      details: [
        'Professional performers show up on time',
        'High-quality performances guaranteed',
        'Support team available if needed',
        'Leave a review and help the community',
      ],
      gradient: 'from-pink-500 to-pink-600'
    },
  ];

  const forPerformers = [
    {
      title: 'Create Your Profile',
      description: 'Sign up for free and create a professional profile showcasing your talent, experience, and pricing.',
      icon: Users
    },
    {
      title: 'Get Discovered',
      description: 'Be found by thousands of clients searching for performers. Our algorithm promotes quality acts.',
      icon: Search
    },
    {
      title: 'Manage Bookings',
      description: 'Accept booking requests, manage your calendar, and communicate with clients all in one place.',
      icon: Clock
    },
    {
      title: 'Get Paid',
      description: 'Receive secure payments directly to your bank account. We handle all the payment processing.',
      icon: CreditCard
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-pink-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            Simple & Secure
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            How BookedUp Works
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We make booking entertainment simple, secure, and stress-free for everyone
          </p>
        </div>
      </section>

      {/* For Clients */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              For Event Organizers
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Book perfect entertainment in 4 steps
            </h2>
            <p className="text-xl text-gray-600">
              From discovery to celebration, we've got you covered
            </p>
          </div>

          <div className="space-y-20">
            {steps.map((step, index) => (
              <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
                <div className="lg:w-1/2">
                  <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${step.gradient} rounded-2xl mb-6 shadow-lg`}>
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold mb-4">
                    STEP {index + 1}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-lg text-gray-600 mb-6">
                    {step.description}
                  </p>
                  <ul className="space-y-3">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:w-1/2">
                  <div className="card-elevated p-8 bg-gradient-to-br from-gray-50 to-white">
                    <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
                      <step.icon className="w-24 h-24 text-purple-400" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link to="/performers">
              <Button size="lg" className="btn-primary px-8 py-4">
                Start Browsing Performers
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* For Performers */}
      <section className="section bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              For Performers
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Grow your performance business
            </h2>
            <p className="text-xl text-gray-600">
              Get more bookings and manage your business in one place
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {forPerformers.map((item, index) => (
              <div key={index} className="card hover-lift text-center p-8 border-2 border-gray-100 hover:border-purple-200">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-6 shadow-lg">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <div className="inline-flex items-center justify-center w-8 h-8 bg-purple-100 text-purple-700 rounded-full text-sm font-bold mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link to="/register?type=performer">
              <Button size="lg" className="btn-primary px-8 py-4">
                Join as a Performer
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Safety & Security */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Shield className="w-4 h-4" />
              Safe & Secure
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Your safety is our priority
            </h2>
            <p className="text-xl text-gray-600">
              Book with confidence knowing you're protected
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-elevated text-center p-8">
              <div className="text-6xl mb-6">🔒</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Secure Payments
              </h3>
              <p className="text-gray-600">
                All payments are processed securely. Your financial information is never shared.
              </p>
            </div>

            <div className="card-elevated text-center p-8">
              <div className="text-6xl mb-6">✓</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Verified Performers
              </h3>
              <p className="text-gray-600">
                All performers go through our verification process to ensure quality and safety.
              </p>
            </div>

            <div className="card-elevated text-center p-8">
              <div className="text-6xl mb-6">💬</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                24/7 Support
              </h3>
              <p className="text-gray-600">
                Our support team is here to help if you need assistance at any time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-gradient-primary text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to get started?
            </h2>
            <p className="text-xl text-white/90 mb-10">
              Join thousands of happy clients and performers on BookedUp
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/performers">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-base font-semibold shadow-xl">
                  Find Performers
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

export default HowItWorks;
