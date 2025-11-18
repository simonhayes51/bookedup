import { useState } from 'react';
import { Shield, Check, Upload, Award, Star, Lock, FileText, CreditCard, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui';

const Verification = () => {
  const [verifications, setVerifications] = useState({
    identity: { verified: true, date: '2025-09-15', status: 'verified' },
    insurance: { verified: false, date: null, status: 'pending' },
    background: { verified: false, date: null, status: 'not_started' },
    payment: { verified: true, date: '2025-09-16', status: 'verified' },
    equipment: { verified: false, date: null, status: 'pending' },
    address: { verified: true, date: '2025-09-15', status: 'verified' }
  });

  const badges = [
    {
      id: 'identity',
      name: 'Identity Verified',
      icon: Shield,
      description: 'Government-issued ID confirmed',
      benefit: '+15% booking rate',
      color: 'blue',
      required: true,
      documents: ['Passport or Driver\'s License', 'Proof of address'],
      processingTime: 'Instant'
    },
    {
      id: 'insurance',
      name: 'Insured Professional',
      icon: Lock,
      description: 'Public liability insurance verified',
      benefit: '+25% booking rate for premium events',
      color: 'purple',
      required: false,
      documents: ['Public Liability Insurance Certificate (£5M+)'],
      processingTime: '24-48 hours'
    },
    {
      id: 'background',
      name: 'Background Checked',
      icon: FileText,
      description: 'DBS/Enhanced background check',
      benefit: 'Required for children\'s events',
      color: 'green',
      required: false,
      documents: ['DBS Certificate (less than 3 years old)'],
      processingTime: '48-72 hours'
    },
    {
      id: 'payment',
      name: 'Payment Verified',
      icon: CreditCard,
      description: 'Bank account and tax info confirmed',
      benefit: 'Instant payouts enabled',
      color: 'yellow',
      required: true,
      documents: ['Bank account details', 'Tax information'],
      processingTime: 'Instant'
    },
    {
      id: 'equipment',
      name: 'Equipment Certified',
      icon: Award,
      description: 'PAT tested equipment',
      benefit: '+10% for venues requiring certification',
      color: 'orange',
      required: false,
      documents: ['PAT Testing Certificate', 'Equipment inventory list'],
      processingTime: '24 hours'
    },
    {
      id: 'address',
      name: 'Address Verified',
      icon: Check,
      description: 'Business address confirmed',
      benefit: 'Enhanced local search ranking',
      color: 'pink',
      required: true,
      documents: ['Utility bill or council tax statement'],
      processingTime: 'Instant'
    }
  ];

  const achievements = [
    {
      id: '100bookings',
      name: '100+ Bookings',
      icon: Star,
      description: 'Completed 100 successful events',
      unlocked: false,
      progress: 42,
      requirement: 100
    },
    {
      id: '5star',
      name: '5-Star Rated',
      icon: Star,
      description: 'Maintain 4.8+ rating with 50+ reviews',
      unlocked: true,
      progress: 100,
      requirement: 100
    },
    {
      id: 'quickresponder',
      name: 'Quick Responder',
      icon: Shield,
      description: 'Respond to 90% of enquiries within 2 hours',
      unlocked: true,
      progress: 100,
      requirement: 100
    },
    {
      id: 'premium',
      name: 'Premium Member',
      icon: Award,
      description: 'Active Premium subscription for 6+ months',
      unlocked: false,
      progress: 2,
      requirement: 6
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-700 border-green-300';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'not_started': return 'bg-gray-100 text-gray-200 border-gray-300';
      default: return 'bg-gray-100 text-gray-200 border-gray-300';
    }
  };

  const getBadgeColor = (color) => {
    const colors = {
      blue: 'from-blue-500 to-blue-700',
      purple: 'from-purple-500 to-purple-700',
      green: 'from-green-500 to-green-700',
      yellow: 'from-yellow-500 to-yellow-700',
      orange: 'from-orange-500 to-orange-700',
      pink: 'from-pink-500 to-pink-700'
    };
    return colors[color] || colors.blue;
  };

  const verificationCount = Object.values(verifications).filter(v => v.verified).length;
  const totalVerifications = badges.length;
  const completionRate = Math.round((verificationCount / totalVerifications) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-10 h-10 text-purple-400" />
            <h1 className="text-4xl font-bold text-white">Verification & Badges</h1>
          </div>
          <p className="text-gray-300">Build trust and get more bookings with verified badges</p>
        </div>

        {/* Progress Overview */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg p-8 mb-8 text-white">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Verification Progress</h2>
              <p className="text-purple-100">Complete all verifications to unlock maximum visibility</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">{verificationCount}/{totalVerifications}</div>
              <div className="text-sm text-purple-200">Badges Earned</div>
            </div>
          </div>

          <div className="mb-2">
            <div className="flex justify-between text-sm mb-1">
              <span>Completion: {completionRate}%</span>
              <span>{verificationCount === totalVerifications ? 'All Done! 🎉' : `${totalVerifications - verificationCount} to go`}</span>
            </div>
            <div className="h-4 bg-slate-800/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-slate-800 rounded-full transition-all duration-500"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-slate-800/10 backdrop-blur-sm rounded-lg p-4">
              <div className="font-semibold mb-1">📈 Profile Boost</div>
              <div>Each badge increases your search ranking</div>
            </div>
            <div className="bg-slate-800/10 backdrop-blur-sm rounded-lg p-4">
              <div className="font-semibold mb-1">💰 Higher Rates</div>
              <div>Verified performers charge 30% more on average</div>
            </div>
            <div className="bg-slate-800/10 backdrop-blur-sm rounded-lg p-4">
              <div className="font-semibold mb-1">🎯 Better Clients</div>
              <div>Premium events require verified performers</div>
            </div>
          </div>
        </div>

        {/* Verification Badges */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Verification Badges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {badges.map((badge) => {
              const Icon = badge.icon;
              const verification = verifications[badge.id];
              const isVerified = verification.verified;

              return (
                <div
                  key={badge.id}
                  className={`bg-slate-800 rounded-lg border-2 overflow-hidden ${
                    isVerified ? 'border-green-400' : 'border-gray-200'
                  }`}
                >
                  <div className={`bg-gradient-to-r ${getBadgeColor(badge.color)} p-6 text-white relative`}>
                    {isVerified && (
                      <div className="absolute top-2 right-2 bg-slate-800 text-green-600 rounded-full p-1">
                        <Check className="w-5 h-5" />
                      </div>
                    )}
                    {badge.required && (
                      <div className="absolute top-2 left-2 bg-slate-800/20 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold">
                        Required
                      </div>
                    )}
                    <Icon className="w-12 h-12 mb-3" />
                    <h3 className="text-xl font-bold">{badge.name}</h3>
                  </div>

                  <div className="p-6">
                    <p className="text-gray-200 mb-4">{badge.description}</p>

                    <div className={`text-sm px-3 py-2 rounded-lg mb-4 border-2 ${getStatusColor(verification.status)}`}>
                      <div className="font-semibold">
                        {verification.status === 'verified' && `✓ Verified ${verification.date}`}
                        {verification.status === 'pending' && '⏳ Under Review'}
                        {verification.status === 'not_started' && '○ Not Started'}
                      </div>
                    </div>

                    <div className="bg-green-50 border-2 border-green-200 rounded-lg p-3 mb-4">
                      <div className="text-sm font-semibold text-green-700">💡 Benefit</div>
                      <div className="text-sm text-green-600">{badge.benefit}</div>
                    </div>

                    <div className="text-xs text-gray-300 mb-3">
                      <div className="font-semibold mb-1">Required Documents:</div>
                      <ul className="list-disc list-inside space-y-1">
                        {badge.documents.map((doc, index) => (
                          <li key={index}>{doc}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="text-xs text-gray-500 mb-4">
                      ⏱ Processing time: {badge.processingTime}
                    </div>

                    {!isVerified && (
                      <Button variant="primary" className="w-full">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Documents
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Achievement Badges */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Achievement Badges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;

              return (
                <div
                  key={achievement.id}
                  className={`bg-slate-800 rounded-lg p-6 border-2 ${
                    achievement.unlocked ? 'border-yellow-400' : 'border-gray-200'
                  }`}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                    achievement.unlocked
                      ? 'bg-gradient-to-r from-yellow-400 to-yellow-600'
                      : 'bg-gray-200'
                  }`}>
                    <Icon className={`w-8 h-8 ${achievement.unlocked ? 'text-white' : 'text-gray-400'}`} />
                  </div>

                  <h3 className="font-bold text-white mb-2">{achievement.name}</h3>
                  <p className="text-sm text-gray-300 mb-4">{achievement.description}</p>

                  {!achievement.unlocked && (
                    <div>
                      <div className="flex justify-between text-xs text-gray-300 mb-1">
                        <span>Progress</span>
                        <span>{achievement.progress}/{achievement.requirement}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-purple-700"
                          style={{ width: `${(achievement.progress / achievement.requirement) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {achievement.unlocked && (
                    <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg px-3 py-2 text-center">
                      <div className="text-sm font-bold text-yellow-700">✓ Unlocked!</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Info Banner */}
        <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-blue-900 mb-2">Why Verification Matters</h3>
              <div className="text-sm text-blue-800 space-y-1">
                <p>• <strong>83% of clients</strong> only book verified performers</p>
                <p>• <strong>Verified performers</strong> appear 5x higher in search results</p>
                <p>• <strong>Premium events</strong> require insurance and background checks</p>
                <p>• <strong>Instant payouts</strong> only available to verified accounts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;
