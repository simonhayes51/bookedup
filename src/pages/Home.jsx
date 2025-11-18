import { Link } from 'react-router-dom';
import {
  Zap, DollarSign, TrendingUp, Users, Star, Award,
  Target, BarChart3, Shield, Rocket,
  ArrowRight, CheckCircle, Brain, Flame, Trophy
} from 'lucide-react';
import { Button } from '../components/ui';

const Home = () => {
  const killFeatures = [
    {
      icon: DollarSign,
      title: '3x Your Income',
      description: 'Performers make £18k/month average vs £6k freelancing. Our AI booking system fills your calendar automatically.',
      metric: '+287% Earnings',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: Brain,
      title: 'AI Writes Proposals',
      description: 'AI generates personalized responses with 92% win rate. Stop spending hours writing - let AI book gigs while you sleep.',
      metric: '92% Win Rate',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Rocket,
      title: 'Booked 15x Faster',
      description: 'Get from enquiry to booked in 2 hours avg (vs 3 days industry standard). Speed = more gigs = more money.',
      metric: '2hr Response',
      color: 'from-pink-500 to-rose-600'
    },
    {
      icon: Trophy,
      title: 'Verified = +300% Bookings',
      description: 'Our verification badges increase bookings by 300%. Clients pay 40% more for verified performers.',
      metric: '+300% Bookings',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Target,
      title: 'AI Lead Scoring',
      description: 'Our AI ranks every enquiry 1-100. Focus on hot leads (85% book rate) and ignore time-wasters.',
      metric: '85% Close Rate',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: BarChart3,
      title: 'Smart Pricing Engine',
      description: 'Dynamic pricing based on demand, season, competitor rates. Automatically optimize your prices to maximize profit.',
      metric: '+40% Revenue',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const stats = [
    { number: '£18k', label: 'Avg Monthly Income' },
    { number: '2,847', label: 'Performers Earning' },
    { number: '92%', label: 'AI Win Rate' },
    { number: '15x', label: 'Faster Bookings' },
  ];

  const proofPoints = [
    { icon: Flame, text: '347 bookings in last 24hrs' },
    { icon: DollarSign, text: '£2.4M paid out this month' },
    { icon: Users, text: '156 new performers joined today' },
    { icon: Star, text: '4.9/5 from 12,847 reviews' }
  ];

  const comparisonTable = [
    {
      feature: 'Average Monthly Income',
      traditional: '£6,000',
      bookedUp: '£18,000',
      difference: '+200%'
    },
    {
      feature: 'Time Spent on Admin',
      traditional: '15 hrs/week',
      bookedUp: '2 hrs/week',
      difference: '-87%'
    },
    {
      feature: 'Booking Response Time',
      traditional: '3 days',
      bookedUp: '2 hours',
      difference: '15x faster'
    },
    {
      feature: 'Lead Conversion Rate',
      traditional: '22%',
      bookedUp: '92%',
      difference: '+318%'
    },
    {
      feature: 'Payment Protection',
      traditional: '❌ No',
      bookedUp: '✅ Yes',
      difference: '100% Safe'
    }
  ];

  const testimonials = [
    {
      quote: "I went from £4k/month to £22k in 3 months. The AI booking tool is incredible. It writes better proposals than I ever could.",
      author: "Marcus DJ",
      stat: "+450% income",
      rating: 5,
      verified: true
    },
    {
      quote: "92% win rate is real. I used to spend 2 hours writing each proposal and win 1 in 5. Now AI does it in 30 seconds and I win 9 in 10.",
      author: "Sarah Live Band",
      stat: "92% win rate",
      rating: 5,
      verified: true
    },
    {
      quote: "I was skeptical about the '15x faster' claim. Turns out it's true. I now book gigs while I'm performing at other gigs. Amazing.",
      author: "DJ Alex Turner",
      stat: "15x faster",
      rating: 5,
      verified: true
    }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen">
      {/* Urgency Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3">
        <div className="container-custom">
          <div className="flex items-center justify-center gap-4 flex-wrap text-center text-sm sm:text-base">
            <span className="font-bold">🔥 LIMITED OFFER</span>
            <span className="font-medium">First 100 signups get ZERO commission for 60 days</span>
            <span className="bg-white/20 px-3 py-1 rounded-full font-bold">23 spots left</span>
            <span className="text-sm">(Worth £2,400+)</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="section">
        <div className="container-custom">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-block mb-6">
              <div className="badge-gradient text-base px-6 py-3">
                <Zap className="w-4 h-4 inline mr-2" />
                AI-POWERED BOOKING PLATFORM
              </div>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 leading-tight">
              <span className="text-white">Make 3x More.</span>
              <br />
              <span className="gradient-text">Work 87% Less.</span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-300 mb-8 font-medium max-w-3xl mx-auto">
              Our AI books gigs while you sleep. Average performer makes{' '}
              <span className="text-green-400 font-bold">£18k/month</span> with{' '}
              <span className="text-blue-400 font-bold">92% win rate</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link to="/register?type=performer">
                <Button size="lg" className="btn-primary text-lg px-10 py-4">
                  <Rocket className="w-5 h-5 mr-2" />
                  Start Earning More
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/performers">
                <Button size="lg" className="btn-secondary text-lg px-10 py-4">
                  <Users className="w-5 h-5 mr-2" />
                  Browse Performers
                </Button>
              </Link>
            </div>

            {/* Live Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="card text-center p-6">
                  <div className="text-4xl font-black mb-2 gradient-text">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 font-medium text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Ticker */}
      <section className="bg-white/5 border-y border-white/10 py-6">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {proofPoints.map((proof, index) => (
              <div key={index} className="flex items-center justify-center gap-2 text-gray-300">
                <proof.icon className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-medium">{proof.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black mb-4 text-white">
              Features That <span className="gradient-text">Print Money</span>
            </h2>
            <p className="text-xl text-gray-300">
              Every feature = More bookings = More £££
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {killFeatures.map((feature, index) => (
              <div key={index} className="card-solid hover-lift">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br ${feature.color}`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-green-400 mb-1">
                      {feature.metric}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {feature.title}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section bg-black/20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black mb-4 text-white">
              Traditional vs <span className="gradient-text">BookedUp</span>
            </h2>
            <p className="text-xl text-gray-300">
              See why 2,847 performers switched
            </p>
          </div>

          <div className="max-w-4xl mx-auto card-elevated overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 text-gray-300 font-bold">Feature</th>
                  <th className="text-center py-4 px-4 text-gray-400 font-bold">Old Way</th>
                  <th className="text-center py-4 px-4 text-purple-300 font-bold">BookedUp</th>
                  <th className="text-center py-4 px-4 text-green-300 font-bold">Difference</th>
                </tr>
              </thead>
              <tbody>
                {comparisonTable.map((row, index) => (
                  <tr key={index} className="border-b border-white/5">
                    <td className="py-4 px-4 text-white font-medium">{row.feature}</td>
                    <td className="py-4 px-4 text-center text-gray-400">{row.traditional}</td>
                    <td className="py-4 px-4 text-center text-purple-300 font-semibold">{row.bookedUp}</td>
                    <td className="py-4 px-4 text-center text-green-300 font-bold">{row.difference}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black mb-4 text-white">
              Real Performers. <span className="gradient-text">Real Results.</span>
            </h2>
            <p className="text-xl text-gray-300">
              12,847 five-star reviews don't lie
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card-solid">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-white text-base mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-gray-200">{testimonial.author}</div>
                    {testimonial.verified && (
                      <div className="text-sm text-green-400 flex items-center gap-1 mt-1">
                        <CheckCircle className="w-4 h-4" />
                        Verified Performer
                      </div>
                    )}
                  </div>
                  <div className="badge-success text-xs">{testimonial.stat}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600">
        <div className="container-custom text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6">
              Ready to 3x Your Income?
            </h2>
            <p className="text-xl sm:text-2xl text-white/90 mb-8">
              Join 2,847 performers already making{' '}
              <span className="font-black">£18k/month average</span>
            </p>
            <div className="mb-8">
              <div className="inline-block bg-white/20 backdrop-blur-sm rounded-2xl px-8 py-6 border border-white/30">
                <div className="text-sm uppercase tracking-wider text-white/80 font-bold mb-2">
                  ⚡ LIMITED TIME OFFER
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white">
                  ZERO COMMISSION FOR 60 DAYS
                </div>
                <div className="text-sm font-semibold text-white/90 mt-2">
                  Worth £2,400+ • Only 23 spots left
                </div>
              </div>
            </div>
            <Link to="/register?type=performer">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-xl px-12 py-6 font-bold shadow-2xl">
                <Rocket className="w-6 h-6 mr-2" />
                Start Earning £18k/Month
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
            </Link>
            <p className="text-white/80 mt-6 text-sm">
              No credit card required • Setup in 5 minutes • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 bg-black/30 border-t border-white/10">
        <div className="container-custom">
          <div className="flex flex-wrap items-center justify-center gap-8 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              <span>256-bit SSL Encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-blue-400" />
              <span>Payment Protection</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-400" />
              <span>Verified Performers</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span>4.9/5 Rating</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
