import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, MapPin, Star, Heart, Filter, Loader2, TrendingUp } from 'lucide-react';
import { Card, Button, Input, Select, Badge, EmptyState } from '../components/ui';
import performersService from '../services/performers';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const Performers = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [performers, setPerformers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    genre: searchParams.get('genre') || '',
    location: searchParams.get('location') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    verified: searchParams.get('verified') === 'true',
    premium: searchParams.get('premium') === 'true',
    sort: searchParams.get('sort') || 'rating',
  });

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    totalPages: 1,
  });

  const genres = [
    { value: '', label: 'All Genres' },
    { value: 'DJ', label: 'DJ' },
    { value: 'Singer', label: 'Singer' },
    { value: 'Band', label: 'Band' },
    { value: 'Comedy', label: 'Comedy' },
  ];

  const sortOptions = [
    { value: 'rating', label: 'Highest Rated' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'popular', label: 'Most Popular' },
  ];

  useEffect(() => {
    fetchPerformers();
  }, [filters, pagination.page]);

  const fetchPerformers = async () => {
    setLoading(true);
    try {
      const params = {
        ...filters,
        page: pagination.page,
        limit: pagination.limit,
      };

      // Remove empty filters
      Object.keys(params).forEach(key => {
        if (params[key] === '' || params[key] === false) {
          delete params[key];
        }
      });

      const response = await performersService.getPerformers(params);
      setPerformers(response.data);
      setPagination(prev => ({
        ...prev,
        totalPages: response.totalPages || 1,
      }));
    } catch (error) {
      console.error('Failed to fetch performers:', error);
      toast.error('Failed to load performers');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, page: 1 }));

    // Update URL params
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const handleToggleFavorite = async (performerId) => {
    try {
      await performersService.toggleFavorite(performerId);
      setFavorites(prev => {
        const newFavorites = new Set(prev);
        if (newFavorites.has(performerId)) {
          newFavorites.delete(performerId);
          toast.success('Removed from favorites');
        } else {
          newFavorites.add(performerId);
          toast.success('Added to favorites');
        }
        return newFavorites;
      });
    } catch (error) {
      toast.error('Failed to update favorites');
    }
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      genre: '',
      location: '',
      minPrice: '',
      maxPrice: '',
      verified: false,
      premium: false,
      sort: 'rating',
    });
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Find Performers</h1>
          <p className="mt-2 text-gray-300">
            Discover talented artists for your next event
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search performers..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            {/* Quick Filters */}
            <div className="flex gap-2">
              <Select
                options={genres}
                value={filters.genre}
                onChange={(e) => handleFilterChange('genre', e.target.value)}
                className="min-w-[150px]"
              />
              <Select
                options={sortOptions}
                value={filters.sort}
                onChange={(e) => handleFilterChange('sort', e.target.value)}
                className="min-w-[180px]"
              />
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <Card className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="Location"
                  placeholder="City or postcode"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                />
                <Input
                  label="Min Price (£)"
                  type="number"
                  placeholder="0"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                />
                <Input
                  label="Max Price (£)"
                  type="number"
                  placeholder="5000"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                />
              </div>

              <div className="mt-4 flex items-center gap-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.verified}
                    onChange={(e) => handleFilterChange('verified', e.target.checked)}
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-200">Verified only</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.premium}
                    onChange={(e) => handleFilterChange('premium', e.target.checked)}
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-200">Premium only</span>
                </label>

                <button
                  onClick={resetFilters}
                  className="ml-auto text-sm text-red-600 hover:text-red-700"
                >
                  Reset Filters
                </button>
              </div>
            </Card>
          )}
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="lg" text="Loading performers..." />
          </div>
        ) : performers.length === 0 ? (
          <EmptyState
            icon={Search}
            title="No performers found"
            description="Try adjusting your filters or search terms"
            action={
              <Button onClick={resetFilters} variant="primary">
                Clear Filters
              </Button>
            }
          />
        ) : (
          <>
            {/* Count */}
            <div className="mb-4 text-sm text-gray-300">
              Found {performers.length} performer{performers.length !== 1 ? 's' : ''}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {performers.map((performer) => (
                <Card key={performer.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <Link to={`/performers/${performer.id}`}>
                    {/* Image */}
                    <div className="relative h-48 bg-gray-200 overflow-hidden">
                      <img
                        src={performer.featuredImage || performer.images?.[0] || 'https://via.placeholder.com/400x300'}
                        alt={performer.stageName}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      {performer.premium && (
                        <Badge
                          variant="warning"
                          className="absolute top-2 right-2 bg-yellow-400 text-white"
                        >
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Premium
                        </Badge>
                      )}
                      {performer.verified && (
                        <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                          ✓ Verified
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <Link to={`/performers/${performer.id}`}>
                        <h3 className="font-semibold text-lg text-white hover:text-red-600">
                          {performer.stageName}
                        </h3>
                      </Link>
                      <button
                        onClick={() => handleToggleFavorite(performer.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            favorites.has(performer.id) ? 'fill-red-500 text-red-500' : ''
                          }`}
                        />
                      </button>
                    </div>

                    <Badge variant="default" className="mb-2">
                      {performer.genre}
                    </Badge>

                    <div className="flex items-center text-sm text-gray-300 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {performer.location}
                    </div>

                    <div className="flex items-center mb-3">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 text-sm font-medium text-white">
                        {performer.rating || 0}
                      </span>
                      <span className="ml-1 text-sm text-gray-300">
                        ({performer.totalReviews || 0} reviews)
                      </span>
                    </div>

                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-2xl font-bold text-white">
                          £{performer.priceMin}
                        </span>
                        {performer.priceMax && performer.priceMax !== performer.priceMin && (
                          <span className="text-sm text-gray-300">
                            {' '}- £{performer.priceMax}
                          </span>
                        )}
                        <span className="text-sm text-gray-300 ml-1">
                          /{performer.priceUnit || 'event'}
                        </span>
                      </div>
                    </div>

                    <Link to={`/performers/${performer.id}`}>
                      <Button variant="primary" size="sm" className="w-full mt-4">
                        View Profile
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setPagination(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
                  disabled={pagination.page === 1}
                >
                  Previous
                </Button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setPagination(prev => ({ ...prev, page }))}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        page === pagination.page
                          ? 'bg-red-600 text-white'
                          : 'bg-slate-800 text-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  onClick={() => setPagination(prev => ({ ...prev, page: Math.min(pagination.totalPages, prev.page + 1) }))}
                  disabled={pagination.page === pagination.totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Performers;
