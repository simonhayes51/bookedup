import { useState } from 'react';
import { Plus, Trash2, Edit2, Save, DollarSign, Clock, Users, Zap, Star, Package } from 'lucide-react';
import { Button } from '../components/ui';

const PackageBuilder = () => {
  const [packages, setPackages] = useState([
    {
      id: 1,
      name: 'Bronze',
      price: 350,
      duration: '2 hours',
      description: 'Perfect for intimate gatherings and small events',
      features: [
        'Professional DJ setup',
        'Music library access',
        'Basic lighting',
        'Event planning consultation'
      ],
      popular: false
    },
    {
      id: 2,
      name: 'Silver',
      price: 550,
      duration: '4 hours',
      description: 'Ideal for weddings and corporate events',
      features: [
        'Everything in Bronze',
        'Extended playtime',
        'Advanced lighting system',
        'Wireless microphone',
        'Custom playlist creation',
        'MC services'
      ],
      popular: true
    },
    {
      id: 3,
      name: 'Gold',
      price: 850,
      duration: '6 hours',
      description: 'Premium experience for unforgettable events',
      features: [
        'Everything in Silver',
        'Premium sound system',
        'Professional lighting rig',
        'Smoke machine',
        'Photo booth integration',
        'Dedicated event manager',
        'Custom branding/monogram'
      ],
      popular: false
    }
  ]);

  const [addOns, setAddOns] = useState([
    { id: 1, name: 'Extra Hour', price: 100, description: 'Extend your event by one hour' },
    { id: 2, name: 'Photo Booth', price: 200, description: 'Professional photo booth with props' },
    { id: 3, name: 'Live Musician', price: 300, description: 'Acoustic set during dinner' },
    { id: 4, name: 'Karaoke Setup', price: 150, description: 'Full karaoke system with song library' }
  ]);

  const [editingPackage, setEditingPackage] = useState(null);
  const [showAddPackage, setShowAddPackage] = useState(false);

  const stats = {
    totalPackages: packages.length,
    avgPrice: Math.round(packages.reduce((sum, p) => sum + p.price, 0) / packages.length),
    popularPackage: packages.find(p => p.popular)?.name || 'Silver',
    conversionRate: 34
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Package Builder</h1>
              <p className="text-gray-300">Create pricing packages that sell</p>
            </div>
            <Button onClick={() => setShowAddPackage(true)}>
              <Plus className="w-5 h-5 mr-2" />
              New Package
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800 rounded-lg p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-300 text-sm mb-1">Active Packages</div>
                <div className="text-3xl font-bold text-white">{stats.totalPackages}</div>
              </div>
              <Package className="w-10 h-10 text-purple-600" />
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-300 text-sm mb-1">Average Price</div>
                <div className="text-3xl font-bold text-purple-600">£{stats.avgPrice}</div>
              </div>
              <DollarSign className="w-10 h-10 text-purple-600" />
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-300 text-sm mb-1">Most Popular</div>
                <div className="text-2xl font-bold text-white">{stats.popularPackage}</div>
              </div>
              <Star className="w-10 h-10 text-yellow-500" />
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-300 text-sm mb-1">Conversion Rate</div>
                <div className="text-3xl font-bold text-green-600">{stats.conversionRate}%</div>
              </div>
              <Zap className="w-10 h-10 text-green-600" />
            </div>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Your Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`bg-slate-800 rounded-lg overflow-hidden border-2 ${
                  pkg.popular ? 'border-purple-500 ring-4 ring-purple-200' : 'border-gray-200'
                } hover:shadow-xl transition-all`}
              >
                {pkg.popular && (
                  <div className="bg-purple-600 text-white text-center py-2 text-sm font-semibold">
                    MOST POPULAR
                  </div>
                )}

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl font-bold text-purple-600">£{pkg.price}</span>
                    <span className="text-gray-500 ml-2">/ {pkg.duration}</span>
                  </div>
                  <p className="text-gray-300 mb-6">{pkg.description}</p>

                  <div className="space-y-3 mb-6">
                    {pkg.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-200 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingPackage(pkg)}
                      className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
                    >
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit
                    </button>
                    <button
                      className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add-Ons */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Add-Ons & Extras</h2>
            <Button variant="secondary">
              <Plus className="w-5 h-5 mr-2" />
              New Add-On
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addOns.map((addon) => (
              <div
                key={addon.id}
                className="bg-slate-800 rounded-lg p-6 border-2 border-gray-200 hover:border-purple-300 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1">{addon.name}</h3>
                    <p className="text-gray-300 text-sm mb-3">{addon.description}</p>
                    <div className="text-2xl font-bold text-purple-600">+£{addon.price}</div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-300 hover:text-purple-600 transition-colors">
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-300 hover:text-red-600 transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Tips */}
        <div className="mt-8 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg p-6 text-white">
          <h3 className="text-xl font-bold mb-4">💡 Pricing Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>✓ Create 3 tiers:</strong> Bronze/Silver/Gold pricing anchors customers to the middle option
            </div>
            <div>
              <strong>✓ Price ending in 9:</strong> £549 converts better than £550
            </div>
            <div>
              <strong>✓ Bundle smartly:</strong> Include high-value, low-cost items in premium tiers
            </div>
            <div>
              <strong>✓ Add urgency:</strong> "Book 3+ months ahead - save 10%"
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageBuilder;
