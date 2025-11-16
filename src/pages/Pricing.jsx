import { Link } from 'react-router-dom';
import { Check, X, Star, TrendingUp, Zap, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui';

const Pricing = () => {
  const clientPlans = [
    {
      name: 'Free',
      price: '0',
      description: 'Perfect for occasional events',
      features: [
        { text: 'Browse all performers', included: true },
        { text: 'Direct messaging', included: true },
        { text: 'Secure bookings', included: true },
        { text: 'Customer support', included: true },
        { text: '5% booking fee', included: true },
        { text: 'Priority support', included: false },
        { text: 'Dedicated account manager', included: false },
      ],
      cta: 'Get Started',
      link: '/register',
      popular: false,
    },
  ];

  const performerPlans = [
    {
      name: 'Basic',
      price: '0',
      description: 'Great for getting started',
      icon: Star,
      features: [
        { text: 'Create profile page', included: true },
        { text: 'Receive booking requests', included: true },
        { text: 'Direct messaging with clients', included: true },
        { text: 'Payment processing', included: true },
        { text: '15% commission per booking', included: true },
        { text: 'Profile verification badge', included: false },
        { text: 'Featured in search results', included: false },
        { text: 'Analytics dashboard', included: false },
        { text: 'Priority support', included: false },
      ],
      cta: 'Join Free',
      link: '/register?type=performer',
      popular: false,
    },
    {
      name: 'Premium',
      price: '29',
      period: '/month',
      description: 'For serious professionals',
      icon: TrendingUp,
      features: [
        { text: 'Everything in Basic', included: true },
        { text: '10% commission (save 5%)', included: true },
        { text: 'Profile verification badge', included: true },
        { text: 'Featured in search results', included: true },
        { text: 'Analytics dashboard', included: true },
        { text: 'Priority customer support', included: true },
        { text: 'Profile customization', included: true },
        { text: 'Unlimited photo & video uploads', included: true },
        { text: 'Early access to new features', included: true },
      ],
      cta: 'Go Premium',
      link: '/register?type=performer&plan=premium',
      popular: true,
    },
    {
      name: 'Pro',
      price: '99',
      period: '/month',
      description: 'Maximum visibility & growth',
      icon: Zap,
      features: [
        { text: 'Everything in Premium', included: true },
        { text: '5% commission (save 10%)', included: true },
        { text: 'Top placement in search', included: true },
        { text: 'Featured on homepage', included: true },
        { text: 'Advanced analytics & insights', included: true },
        { text: 'Dedicated account manager', included: true },
        { text: 'Marketing & promotion support', included: true },
        { text: 'Priority booking placement', included: true },
        { text: 'Custom branding options', included: true },
      ],
      cta: 'Go Pro',
      link: '/register?type=performer&plan=pro',
      popular: false,
    },
  ];

  return (
    <div className="bg-gradient-to-br from-purple-900 via-black to-purple-900">
      {/* Hero */}
      <section className="gradient-rotate border-b-8 border-black text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-black uppercase mb-6 neon-glow tracking-wider">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl font-bold text-white bg-black/60 px-6 py-4 border-4 border-yellow-400 max-w-2xl mx-auto">
            Choose the plan that's RIGHT for you. NO HIDDEN FEES! 💰
          </p>
        </div>
      </section>

      {/* For Clients */}
      <section className="py-20 bg-gradient-to-br from-black via-purple-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-cyan-400 to-yellow-400 uppercase tracking-wider mb-4">
              For Event Organizers
            </h2>
            <p className="text-xl font-bold text-cyan-400 bg-black/50 px-6 py-3 border-4 border-cyan-400 inline-block">
              ALWAYS FREE to browse and book! 🎉
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="retro-card-cyan p-8 retro-shadow border-4 border-black">
              <div className="text-center">
                <h3 className="text-3xl font-black text-black uppercase mb-2 bg-white/90 px-4 py-2">
                  {clientPlans[0].name}
                </h3>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-6xl font-black text-yellow-400 drop-shadow-[0_0_10px_rgba(255,255,0,0.8)]">£{clientPlans[0].price}</span>
                </div>
                <p className="text-black font-bold mb-6 bg-white/80 px-4 py-2 border-2 border-black">
                  {clientPlans[0].description}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {clientPlans[0].features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    {feature.included ? (
                      <Check className="w-6 h-6 text-black mr-3 mt-0.5 flex-shrink-0" />
                    ) : (
                      <X className="w-6 h-6 text-black/40 mr-3 mt-0.5 flex-shrink-0" />
                    )}
                    <span className={`font-bold text-sm ${feature.included ? 'text-black bg-white/80 px-2 py-1' : 'text-black/60'}`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Link to={clientPlans[0].link}>
                <Button variant="secondary" size="lg" className="w-full text-lg">
                  {clientPlans[0].cta}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          <p className="text-center text-sm font-bold text-cyan-400 mt-6 bg-black/50 px-6 py-3 border-2 border-cyan-400 inline-block">
            * A small 5% booking fee applies to help us maintain and improve the platform
          </p>
        </div>
      </section>

      {/* For Performers */}
      <section className="py-20 bg-gradient-to-br from-purple-900 to-black border-y-8 border-pink-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-500 uppercase tracking-wider mb-4">
              For Performers
            </h2>
            <p className="text-xl font-bold text-white bg-black/60 px-6 py-3 border-4 border-yellow-400 inline-block">
              Choose the plan that fits your AMBITIONS! 🎸
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {performerPlans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <div
                  key={index}
                  className={`relative ${
                    index === 0 ? 'retro-card-cyan' :
                    index === 1 ? 'retro-card-pink' :
                    'retro-card'
                  } overflow-hidden retro-shadow border-4 border-black ${
                    plan.popular ? 'border-8 border-yellow-400' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-sm font-black uppercase text-center py-3 border-b-4 border-black">
                      ⭐ MOST POPULAR ⭐
                    </div>
                  )}

                  <div className="p-8">
                    <div className="text-center mb-6">
                      <Icon className="w-16 h-16 text-black mx-auto mb-3" />
                      <h3 className="text-3xl font-black text-black uppercase mb-2 bg-white/90 px-3 py-2">
                        {plan.name}
                      </h3>
                      <div className="flex items-baseline justify-center mb-2">
                        <span className="text-5xl font-black text-yellow-400 drop-shadow-[0_0_10px_rgba(255,255,0,0.8)]">£{plan.price}</span>
                        {plan.period && (
                          <span className="text-black font-bold ml-2 bg-white/80 px-2 py-1">{plan.period}</span>
                        )}
                      </div>
                      <p className="text-black font-bold bg-white/80 px-3 py-2 border-2 border-black">
                        {plan.description}
                      </p>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start text-sm">
                          {feature.included ? (
                            <Check className="w-5 h-5 text-black mr-2 mt-0.5 flex-shrink-0" />
                          ) : (
                            <X className="w-5 h-5 text-black/40 mr-2 mt-0.5 flex-shrink-0" />
                          )}
                          <span className={`font-bold ${feature.included ? 'text-black bg-white/80 px-2 py-0.5' : 'text-black/60'}`}>
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Link to={plan.link}>
                      <Button
                        variant={plan.popular ? 'neon' : 'secondary'}
                        size="lg"
                        className="w-full text-lg"
                      >
                        {plan.cta}
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-600 border-4 border-black p-8 text-center retro-shadow">
            <h3 className="text-2xl font-black uppercase text-black mb-3 bg-white/90 px-4 py-2 inline-block">
              Need something CUSTOM?
            </h3>
            <p className="text-black font-bold mb-4 bg-white/80 px-4 py-2 border-2 border-black inline-block">
              For agencies or high-volume performers, we offer ENTERPRISE solutions! 🚀
            </p>
            <Link to="/contact">
              <Button variant="secondary" className="text-lg">Contact Sales</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gradient-to-br from-black via-purple-900 to-black">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-black text-center text-white uppercase neon-glow-cyan tracking-wider mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="retro-card-cyan p-6 retro-shadow">
              <h3 className="text-xl font-black uppercase text-black mb-2 bg-white/90 px-3 py-1">
                Can I upgrade or downgrade my plan?
              </h3>
              <p className="text-black font-bold text-sm bg-white/80 px-3 py-2 border-2 border-black">
                YES! You can upgrade or downgrade your plan at ANY TIME. Changes will be reflected in your next billing cycle.
              </p>
            </div>

            <div className="retro-card-pink p-6 retro-shadow">
              <h3 className="text-xl font-black uppercase text-black mb-2 bg-white/90 px-3 py-1">
                How do commissions work?
              </h3>
              <p className="text-black font-bold text-sm bg-white/80 px-3 py-2 border-2 border-black">
                Commissions are AUTOMATICALLY deducted from each booking payment. The percentage depends on your plan: 15% for Basic, 10% for Premium, and 5% for Pro.
              </p>
            </div>

            <div className="retro-card p-6 retro-shadow">
              <h3 className="text-xl font-black uppercase text-black mb-2 bg-white/90 px-3 py-1">
                Is there a contract?
              </h3>
              <p className="text-black font-bold text-sm bg-white/80 px-3 py-2 border-2 border-black">
                NO CONTRACTS! Premium and Pro plans are MONTH-TO-MONTH. Cancel anytime with NO PENALTIES! 🎉
              </p>
            </div>

            <div className="bg-gradient-to-br from-lime-400 to-green-600 border-4 border-black p-6 retro-shadow">
              <h3 className="text-xl font-black uppercase text-black mb-2 bg-white/90 px-3 py-1">
                What payment methods do you accept?
              </h3>
              <p className="text-black font-bold text-sm bg-white/80 px-3 py-2 border-2 border-black">
                We accept ALL major credit and debit cards through our SECURE payment processor, Stripe! 💳
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
