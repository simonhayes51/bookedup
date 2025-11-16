import { Link } from 'react-router-dom';
import { Search, MessageSquare, CreditCard, Star, CheckCircle, ArrowRight } from 'lucide-react';
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
    },
  ];

  const forPerformers = [
    {
      title: 'Create Your Profile',
      description: 'Sign up for free and create a professional profile showcasing your talent, experience, and pricing.',
    },
    {
      title: 'Get Discovered',
      description: 'Be found by thousands of clients searching for performers. Our algorithm promotes quality acts.',
    },
    {
      title: 'Manage Bookings',
      description: 'Accept booking requests, manage your calendar, and communicate with clients all in one place.',
    },
    {
      title: 'Get Paid',
      description: 'Receive secure payments directly to your bank account. We handle all the payment processing.',
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero */}
      <section className="gradient-rotate py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            How BookedUp Works
          </h1>
          <p className="text-lg text-gray-200">
            We make booking entertainment simple, secure, and stress-free
          </p>
        </div>
      </section>

      {/* For Clients */}
      <section className="py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              For Event Organizers
            </h2>
            <p className="text-lg text-gray-300">
              Book the perfect entertainment in 4 simple steps
            </p>
          </div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="lg:w-1/3">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-lg mb-4">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {index + 1}. {step.title}
                  </h3>
                  <p className="text-gray-300">
                    {step.description}
                  </p>
                </div>

                <div className="lg:w-2/3 retro-card-cyan p-6">
                  <ul className="space-y-3">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-800">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/performers">
              <Button size="xl" variant="primary">
                Start Browsing Performers
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* For Performers */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              For Performers
            </h2>
            <p className="text-lg text-gray-300">
              Grow your performance business with BookedUp
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {forPerformers.map((item, index) => (
              <div key={index} className="retro-card p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-lg text-white text-2xl font-bold mb-4">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-700">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/register?type=performer">
              <Button size="xl" variant="primary">
                Join as a Performer
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Safety & Security */}
      <section className="py-20 bg-gray-800/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Safe & Secure
            </h2>
            <p className="text-lg text-gray-300">
              Your safety and security is our top priority
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="retro-card p-6 text-center">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                Secure Payments
              </h3>
              <p className="text-sm text-gray-700">
                All payments are processed securely. Your financial information is never shared.
              </p>
            </div>

            <div className="retro-card p-6 text-center">
              <div className="text-5xl mb-4">✓</div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                Verified Performers
              </h3>
              <p className="text-sm text-gray-700">
                All performers go through our verification process to ensure quality and safety.
              </p>
            </div>

            <div className="retro-card p-6 text-center">
              <div className="text-5xl mb-4">💬</div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                24/7 Support
              </h3>
              <p className="text-sm text-gray-700">
                Our support team is here to help if you need assistance at any time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
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

export default HowItWorks;
