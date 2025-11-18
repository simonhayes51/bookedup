import { Link } from 'react-router-dom';
import {
  Zap, DollarSign, TrendingUp, Users, Star, Award,
  Sparkles, Target, BarChart3, Clock, Shield, Rocket,
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
      color: 'neon-text-green',
      cardClass: 'retro-card-green'
    },
    {
      icon: Brain,
      title: 'AI Writes Proposals',
      description: 'AI generates personalized responses with 92% win rate. Stop spending hours writing - let AI book gigs while you sleep.',
      metric: '92% Win Rate',
      color: 'neon-text-cyan',
      cardClass: 'retro-card'
    },
    {
      icon: Rocket,
      title: 'Booked 15x Faster',
      description: 'Get from enquiry to booked in 2 hours avg (vs 3 days industry standard). Speed = more gigs = more money.',
      metric: '2hr Response',
      color: 'neon-text-pink',
      cardClass: 'retro-card-pink'
    },
    {
      icon: Trophy,
      title: 'Verified = +300% Bookings',
      description: 'Our verification badges increase bookings by 300%. Clients pay 40% more for verified performers.',
      metric: '+300% Bookings',
      color: 'neon-text-yellow',
      cardClass: 'retro-card-yellow'
    },
    {
      icon: Target,
      title: 'AI Lead Scoring',
      description: 'Our AI ranks every enquiry 1-100. Focus on hot leads (85% book rate) and ignore time-wasters.',
      metric: '85% Close Rate',
      color: 'neon-text-magenta',
      cardClass: 'retro-card-magenta'
    },
    {
      icon: BarChart3,
      title: 'Smart Pricing Engine',
      description: 'Dynamic pricing based on demand, season, competitor rates. Automatically optimize your prices to maximize profit.',
      metric: '+40% Revenue',
      color: 'neon-text-cyan',
      cardClass: 'retro-card'
    }
  ];

  const stats = [
    { number: '£18k', label: 'Avg Monthly Income', glow: 'text-glow-cyan' },
    { number: '2,847', label: 'Performers Earning', glow: 'text-glow-pink' },
    { number: '92%', label: 'AI Win Rate', glow: 'text-glow-cyan' },
    { number: '15x', label: 'Faster Bookings', glow: 'text-glow-pink' },
  ];

  const proofPoints = [
    { icon: Flame, text: '347 bookings in last 24hrs', color: 'neon-text-pink' },
    { icon: DollarSign, text: '£2.4M paid out this month', color: 'neon-text-green' },
    { icon: Users, text: '156 new performers joined today', color: 'neon-text-cyan' },
    { icon: Star, text: '4.9/5 rating from 12,847 reviews', color: 'neon-text-yellow' }
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
      quote: "I went from £4k/month to £22k in 3 months. The AI booking tool is INSANE. It writes better proposals than I ever could.",
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
      quote: "I was skeptical about the '15x faster' claim. Turns out it's true. I now book gigs while I'm performing at other gigs. Wild.",
      author: "DJ Alex Turner",
      stat: "15x faster",
      rating: 5,
      verified: true
    }
  ];

  const urgencyBanner = {
    title: '🔥 LIMITED OFFER',
    text: 'First 100 signups this month get ZERO commission for 60 days',
    remaining: '23 spots left',
    value: 'Worth £2,400+'
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 cyber-grid">
      {/* Urgency Banner */}
      <div className="bg-gradient-neon text-black py-3 scan-lines">
        <div className="container-custom">
          <div className="flex items-center justify-center gap-4 flex-wrap text-center">
            <span className="font-bold text-lg">🔥 {urgencyBanner.title}</span>
            <span className="font-semibold">{urgencyBanner.text}</span>
            <span className="badge-neon pulse-glow">{urgencyBanner.remaining}</span>
            <span className="text-sm font-bold">({urgencyBanner.value})</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="section relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-30"></div>
        <div className="relative container-custom">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-block mb-6 animate-float">
              <div className="badge-neon text-lg px-6 py-3">
                <Zap className="w-5 h-5 inline mr-2" />
                AI-POWERED BOOKING PLATFORM
              </div>
            </div>

            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
              <span className="neon-text-cyan">MAKE 3X MORE.</span>
              <br />
              <span className="neon-text-pink">WORK 87% LESS.</span>
            </h1>

            <p className="text-2xl md:text-3xl text-cyan-300 mb-8 font-semibold">
              Our AI books gigs while you sleep. Average performer makes{' '}
              <span className="neon-text-yellow font-black">£18k/month</span> with{' '}
              <span className="neon-text-green font-black">92% win rate</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Link to="/register?type=performer">
                <button className="btn-neon-cyan text-xl px-12 py-6">
                  <Rocket className="w-6 h-6 inline mr-3" />
                  START EARNING MORE
                </button>
              </Link>
              <Link to="/performers">
                <button className="btn-neon-pink text-xl px-12 py-6">
                  <Users className="w-6 h-6 inline mr-3" />
                  BROWSE PERFORMERS
                </button>
              </Link>
            </div>

            {/* Live Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              {stats.map((stat, index) => (
                <div key={index} className="retro-card text-center">
                  <div className={`text-4xl md:text-5xl font-black mb-2 ${stat.glow}`}>
                    {stat.number}
                  </div>
                  <div className="text-cyan-300 font-semibold text-sm uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Ticker */}
      <section className="bg-black/50 py-6 border-y-2 border-cyan-400">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {proofPoints.map((proof, index) => (
              <div key={index} className="flex items-center justify-center gap-3">
                <proof.icon className={`w-6 h-6 ${proof.color}`} />
                <span className="text-white font-semibold">{proof.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why This Sells Itself */}
      <section className="section">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-4">
              <span className="neon-text-magenta">THE FEATURES THAT</span>{' '}
              <span className="neon-text-cyan">PRINT MONEY 💰</span>
            </h2>
            <p className="text-2xl text-pink-300 font-semibold">
              Every feature = More bookings = More £££
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {killFeatures.map((feature, index) => (
              <div key={index} className={`${feature.cardClass} hover:scale-105 transition-transform`}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-black/50">
                    <feature.icon className={`w-10 h-10 ${feature.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className={`text-sm font-bold uppercase mb-1 ${feature.color}`}>
                      {feature.metric}
                    </div>
                    <h3 className="text-2xl font-black text-white mb-2">
                      {feature.title}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed text-base">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Comparison */}
      <section className="section bg-black/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-4">
              <span className="neon-text-yellow">TRADITIONAL VS</span>{' '}
              <span className="neon-text-pink">BOOKEDUP</span>
            </h2>
            <p className="text-2xl text-cyan-300 font-semibold">
              See why 2,847 performers switched
            </p>
          </div>

          <div className="max-w-4xl mx-auto retro-card-magenta">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-pink-500">
                    <th className="text-left py-4 px-4 text-cyan-300 font-black uppercase">Feature</th>
                    <th className="text-center py-4 px-4 text-gray-400 font-black uppercase">Old Way 😴</th>
                    <th className="text-center py-4 px-4 text-pink-300 font-black uppercase">BookedUp 🚀</th>
                    <th className="text-center py-4 px-4 text-green-300 font-black uppercase">Difference</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonTable.map((row, index) => (
                    <tr key={index} className="border-b border-pink-500/30">
                      <td className="py-4 px-4 text-white font-semibold">{row.feature}</td>
                      <td className="py-4 px-4 text-center text-gray-400">{row.traditional}</td>
                      <td className="py-4 px-4 text-center text-pink-300 font-bold">{row.bookedUp}</td>
                      <td className="py-4 px-4 text-center text-green-300 font-black">{row.difference}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof - Testimonials */}
      <section className="section">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-4">
              <span className="neon-text-green">REAL PERFORMERS.</span>{' '}
              <span className="neon-text-cyan">REAL RESULTS.</span>
            </h2>
            <p className="text-2xl text-pink-300 font-semibold">
              12,847 five-star reviews don't lie
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="retro-card-cyan">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-white text-lg mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-cyan-300">{testimonial.author}</div>
                    {testimonial.verified && (
                      <div className="text-sm text-green-400 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        Verified Performer
                      </div>
                    )}
                  </div>
                  <div className="badge-neon text-xs">{testimonial.stat}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section bg-gradient-cyber scan-lines">
        <div className="container-custom text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6">
              READY TO 3X YOUR INCOME?
            </h2>
            <p className="text-2xl md:text-3xl text-cyan-300 mb-8 font-semibold">
              Join 2,847 performers already making{' '}
              <span className="neon-text-yellow">£18k/month average</span>
            </p>
            <div className="mb-8">
              <div className="inline-block retro-card-yellow px-8 py-4">
                <div className="text-sm uppercase tracking-wider text-black font-black mb-1">
                  ⚡ LIMITED TIME OFFER
                </div>
                <div className="text-2xl font-black text-black">
                  ZERO COMMISSION FOR 60 DAYS
                </div>
                <div className="text-sm font-bold text-black mt-1">
                  Worth £2,400+ • Only 23 spots left
                </div>
              </div>
            </div>
            <Link to="/register?type=performer">
              <button className="btn-neon-cyan text-2xl px-16 py-8 pulse-glow">
                <Rocket className="w-8 h-8 inline mr-3" />
                START EARNING £18K/MONTH
                <ArrowRight className="w-8 h-8 inline ml-3" />
              </button>
            </Link>
            <p className="text-gray-400 mt-6 text-sm">
              No credit card required • Setup in 5 minutes • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-black/50 border-t-2 border-cyan-400">
        <div className="container-custom">
          <div className="flex flex-wrap items-center justify-center gap-8 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              <span>256-bit SSL Encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-cyan-400" />
              <span>Payment Protection</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-pink-400" />
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
