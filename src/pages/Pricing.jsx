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
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-red-600 to-red-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-red-100">
            Choose the plan that's right for you. No hidden fees.
          </p>
        </div>
      </section>

      {/* For Clients */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              For Event Organizers
            </h2>
            <p className="text-xl text-gray-600">
              Always free to browse and book
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 overflow-hidden">
              <div className="p-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {clientPlans[0].name}
                  </h3>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-5xl font-bold text-gray-900">£{clientPlans[0].price}</span>
                  </div>
                  <p className="text-gray-600 mb-6">
                    {clientPlans[0].description}
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {clientPlans[0].features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                      )}
                      <span className={feature.included ? 'text-gray-900' : 'text-gray-500'}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link to={clientPlans[0].link}>
                  <Button variant="primary" size="lg" className="w-full">
                    {clientPlans[0].cta}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-gray-600 mt-6">
            * A small 5% booking fee applies to help us maintain and improve the platform
          </p>
        </div>
      </section>

      {/* For Performers */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              For Performers
            </h2>
            <p className="text-xl text-gray-600">
              Choose the plan that fits your ambitions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {performerPlans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <div
                  key={index}
                  className={`relative bg-white rounded-2xl shadow-xl overflow-hidden ${
                    plan.popular ? 'ring-2 ring-red-600' : 'border border-gray-200'
                  }`}
                >
                  {plan.popular && (
                    <div className="bg-red-600 text-white text-sm font-semibold text-center py-2">
                      Most Popular
                    </div>
                  )}

                  <div className="p-8">
                    <div className="text-center mb-6">
                      <Icon className="w-12 h-12 text-red-600 mx-auto mb-3" />
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {plan.name}
                      </h3>
                      <div className="flex items-baseline justify-center mb-2">
                        <span className="text-5xl font-bold text-gray-900">£{plan.price}</span>
                        {plan.period && (
                          <span className="text-gray-600 ml-2">{plan.period}</span>
                        )}
                      </div>
                      <p className="text-gray-600">
                        {plan.description}
                      </p>
                    </div>

                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start text-sm">
                          {feature.included ? (
                            <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          ) : (
                            <X className="w-5 h-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                          )}
                          <span className={feature.included ? 'text-gray-900' : 'text-gray-500'}>
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Link to={plan.link}>
                      <Button
                        variant={plan.popular ? 'primary' : 'outline'}
                        size="lg"
                        className="w-full"
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

          <div className="mt-12 bg-blue-50 rounded-xl p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Need something custom?
            </h3>
            <p className="text-gray-600 mb-4">
              For agencies or high-volume performers, we offer enterprise solutions.
            </p>
            <Link to="/contact">
              <Button variant="outline">Contact Sales</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I upgrade or downgrade my plan?
              </h3>
              <p className="text-gray-600">
                Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How do commissions work?
              </h3>
              <p className="text-gray-600">
                Commissions are automatically deducted from each booking payment. The percentage depends on your plan: 15% for Basic, 10% for Premium, and 5% for Pro.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is there a contract?
              </h3>
              <p className="text-gray-600">
                No contracts! Premium and Pro plans are month-to-month. Cancel anytime with no penalties.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit and debit cards through our secure payment processor, Stripe.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
