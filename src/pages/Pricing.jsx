import { Link } from 'react-router-dom';
import { Check, X, Star, TrendingUp, Zap, ArrowRight, Crown, Sparkles } from 'lucide-react';
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
      gradient: 'from-gray-500 to-gray-600',
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
      gradient: 'from-purple-500 to-pink-500',
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
      gradient: 'from-yellow-500 to-orange-500',
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

  const faqs = [
    {
      question: 'Can I upgrade or downgrade my plan?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.',
    },
    {
      question: 'How do commissions work?',
      answer: 'Commissions are automatically deducted from each booking payment. The percentage depends on your plan: 15% for Basic, 10% for Premium, and 5% for Pro.',
    },
    {
      question: 'Is there a contract?',
      answer: 'No contracts! Premium and Pro plans are month-to-month. Cancel anytime with no penalties.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit and debit cards through our secure payment processor, Stripe.',
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-pink-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            Transparent Pricing
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Simple, Honest Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that's right for you. No hidden fees, no surprises.
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
              Always Free to Book
            </h2>
            <p className="text-xl text-gray-600">
              Browse, message, and book performers at no cost
            </p>
          </div>

          <div className="max-w-lg mx-auto">
            <div className="card-elevated overflow-hidden border-2 border-purple-200">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 text-center border-b border-purple-200">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {clientPlans[0].name}
                </h3>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-6xl font-bold gradient-text">£{clientPlans[0].price}</span>
                </div>
                <p className="text-lg text-gray-700">
                  {clientPlans[0].description}
                </p>
              </div>

              <div className="p-8">
                <ul className="space-y-4 mb-8">
                  {clientPlans[0].features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      {feature.included ? (
                        <Check className="w-6 h-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      ) : (
                        <X className="w-6 h-6 text-gray-300 mr-3 mt-0.5 flex-shrink-0" />
                      )}
                      <span className={`text-base ${feature.included ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link to={clientPlans[0].link}>
                  <Button size="lg" className="btn-primary w-full text-lg py-4">
                    {clientPlans[0].cta}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            <p className="text-center text-sm text-gray-500 mt-6">
              * A small 5% booking fee applies to help us maintain and improve the platform
            </p>
          </div>
        </div>
      </section>

      {/* For Performers */}
      <section className="section bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              For Performers
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Choose Your Growth Plan
            </h2>
            <p className="text-xl text-gray-600">
              Start free, upgrade as you grow your business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {performerPlans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <div
                  key={index}
                  className={`card-elevated overflow-hidden transition-all hover-lift ${
                    plan.popular ? 'ring-2 ring-purple-500 shadow-2xl scale-105' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="bg-gradient-primary text-white text-sm font-bold text-center py-3 flex items-center justify-center gap-2">
                      <Crown className="w-4 h-4" />
                      MOST POPULAR
                    </div>
                  )}

                  <div className="p-8">
                    <div className="text-center mb-6">
                      <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${plan.gradient} rounded-2xl mb-4 shadow-lg`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {plan.name}
                      </h3>
                      <div className="flex items-baseline justify-center mb-2">
                        <span className="text-5xl font-bold text-gray-900">£{plan.price}</span>
                        {plan.period && (
                          <span className="text-lg text-gray-600 ml-2">{plan.period}</span>
                        )}
                      </div>
                      <p className="text-gray-600 text-base">
                        {plan.description}
                      </p>
                    </div>

                    <ul className="space-y-3 mb-8 min-h-[280px]">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start text-sm">
                          {feature.included ? (
                            <Check className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          ) : (
                            <X className="w-5 h-5 text-gray-300 mr-2 mt-0.5 flex-shrink-0" />
                          )}
                          <span className={feature.included ? 'text-gray-900' : 'text-gray-400'}>
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Link to={plan.link}>
                      <Button
                        size="lg"
                        className={`w-full text-base py-3 ${
                          plan.popular ? 'btn-primary' : 'btn-secondary'
                        }`}
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

          <div className="mt-16 card-elevated p-10 text-center max-w-3xl mx-auto bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200">
            <h3 className="text-3xl font-bold text-gray-900 mb-3">
              Need something custom?
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              For agencies or high-volume performers, we offer enterprise solutions tailored to your needs.
            </p>
            <Link to="/contact">
              <Button size="lg" className="btn-secondary px-8">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our pricing
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="card hover-lift p-6 border-2 border-gray-100 hover:border-purple-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
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
              Join thousands of performers and clients on BookedUp today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/performers">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-base font-semibold shadow-xl">
                  Find Performers
                </Button>
              </Link>
              <Link to="/register?type=performer">
                <Button size="lg" className="bg-white/10 text-white hover:bg-white/20 border-2 border-white/20 px-8 py-4 text-base font-semibold backdrop-blur-sm">
                  Join as Performer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
