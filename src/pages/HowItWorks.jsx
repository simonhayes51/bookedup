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
    <div className="bg-gradient-to-br from-purple-900 via-black to-purple-900">
      {/* Hero */}
      <section className="gradient-rotate border-b-8 border-black text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-black uppercase mb-6 neon-glow tracking-wider">
            How BookedUp Works
          </h1>
          <p className="text-xl font-bold text-white bg-black/60 px-6 py-4 border-4 border-yellow-400 max-w-2xl mx-auto">
            We make booking entertainment SIMPLE, SECURE, and STRESS-FREE! 🎸
          </p>
        </div>
      </section>

      {/* For Clients */}
      <section className="py-20 bg-gradient-to-br from-black via-purple-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-cyan-400 to-yellow-400 uppercase tracking-wider mb-4">
              For Event Organizers
            </h2>
            <p className="text-xl font-bold text-cyan-400 bg-black/50 px-6 py-3 border-4 border-cyan-400 inline-block">
              Book the PERFECT entertainment in 4 RADICAL steps! 🔥
            </p>
          </div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="lg:w-1/3">
                  <div className={`inline-flex items-center justify-center h-20 w-20 border-4 border-black mb-4 ${
                    index === 0 ? 'bg-yellow-400' :
                    index === 1 ? 'bg-pink-500' :
                    index === 2 ? 'bg-cyan-400' :
                    'bg-yellow-400'
                  }`}>
                    <step.icon className="h-10 w-10 text-black" />
                  </div>
                  <h3 className="text-3xl font-black text-white uppercase mb-3 tracking-wide">
                    {index + 1}. {step.title}
                  </h3>
                  <p className="text-white font-bold bg-black/60 px-4 py-3 border-2 border-white">
                    {step.description}
                  </p>
                </div>

                <div className={`lg:w-2/3 ${
                  index === 0 ? 'retro-card-cyan' :
                  index === 1 ? 'retro-card-pink' :
                  index === 2 ? 'retro-card' :
                  'bg-gradient-to-br from-lime-400 to-green-600 border-4 border-black'
                } p-6 retro-shadow`}>
                  <ul className="space-y-3">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-black mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-black font-bold text-sm bg-white/80 px-3 py-1">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/performers">
              <Button size="xl" variant="secondary" className="text-lg">
                Start Browsing Performers
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* For Performers */}
      <section className="py-20 bg-gradient-to-br from-purple-900 to-black border-y-8 border-pink-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-500 uppercase tracking-wider mb-4">
              For Performers
            </h2>
            <p className="text-xl font-bold text-white bg-black/60 px-6 py-3 border-4 border-yellow-400 inline-block">
              Grow your performance business with BookedUp! 🎤
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {forPerformers.map((item, index) => (
              <div key={index} className={`text-center ${
                index === 0 ? 'retro-card-pink' :
                index === 1 ? 'retro-card-cyan' :
                index === 2 ? 'retro-card' :
                'bg-gradient-to-br from-lime-400 to-green-600 border-4 border-black'
              } p-6 retro-shadow hover:scale-105 transition-transform`}>
                <div className={`inline-flex items-center justify-center h-20 w-20 border-4 border-black text-3xl font-black mb-4 ${
                  index === 0 ? 'bg-yellow-400' :
                  index === 1 ? 'bg-pink-500' :
                  index === 2 ? 'bg-cyan-400' :
                  'bg-yellow-400'
                } text-black`}>
                  {index + 1}
                </div>
                <h3 className="text-xl font-black uppercase text-black mb-3 tracking-wide bg-white/90 px-2 py-1">
                  {item.title}
                </h3>
                <p className="text-black font-bold text-sm bg-white/80 px-3 py-2 border-2 border-black">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/register?type=performer">
              <Button size="xl" variant="neon" className="text-lg">
                Join as a Performer
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Safety & Security */}
      <section className="py-20 bg-gradient-to-br from-black via-purple-900 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase neon-glow-cyan tracking-wider mb-4">
              Safe & Secure
            </h2>
            <p className="text-xl font-bold text-cyan-400 bg-black/60 px-6 py-3 border-4 border-cyan-400 inline-block">
              Your safety and security is our TOP PRIORITY! 🔒
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center retro-card-cyan p-6 retro-shadow hover:scale-105 transition-transform">
              <div className="text-6xl mb-4">🔒</div>
              <h3 className="font-black text-xl uppercase text-black mb-3 bg-white/90 px-2 py-1">
                Secure Payments
              </h3>
              <p className="text-sm font-bold text-black bg-white/80 px-3 py-2 border-2 border-black">
                All payments are processed securely. Your financial information is NEVER shared.
              </p>
            </div>

            <div className="text-center retro-card-pink p-6 retro-shadow hover:scale-105 transition-transform">
              <div className="text-6xl mb-4">✓</div>
              <h3 className="font-black text-xl uppercase text-black mb-3 bg-white/90 px-2 py-1">
                Verified Performers
              </h3>
              <p className="text-sm font-bold text-black bg-white/80 px-3 py-2 border-2 border-black">
                All performers go through our verification process to ensure QUALITY and SAFETY.
              </p>
            </div>

            <div className="text-center retro-card p-6 retro-shadow hover:scale-105 transition-transform">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="font-black text-xl uppercase text-black mb-3 bg-white/90 px-2 py-1">
                24/7 Support
              </h3>
              <p className="text-sm font-bold text-black bg-white/80 px-3 py-2 border-2 border-black">
                Our support team is here to help if you need assistance at ANY TIME!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-rotate border-y-8 border-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black uppercase mb-6 gradient-text tracking-wider">
            Ready to Get Started?
          </h2>
          <p className="text-xl font-black text-white mb-8 bg-black/60 px-6 py-4 border-4 border-yellow-400 inline-block">
            Join THOUSANDS of happy clients and performers on BookedUp! 🎉
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/performers">
              <Button size="xl" variant="secondary" className="text-lg">
                Find Performers
              </Button>
            </Link>
            <Link to="/register">
              <Button size="xl" variant="neon" className="text-lg">
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
