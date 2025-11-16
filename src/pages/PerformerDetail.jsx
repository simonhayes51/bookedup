import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, Calendar, MessageSquare, Heart, Share2, CheckCircle } from 'lucide-react';
import { Button, Badge, Card } from '../components/ui';
import LoadingSpinner from '../components/LoadingSpinner';
import performersService from '../services/performers';
import toast from 'react-hot-toast';

const PerformerDetail = () => {
  const { id } = useParams();
  const [performer, setPerformer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetchPerformer();
  }, [id]);

  const fetchPerformer = async () => {
    try {
      const response = await performersService.getPerformer(id);
      setPerformer(response.data);
    } catch (error) {
      console.error('Failed to fetch performer:', error);
      toast.error('Failed to load performer details');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = async () => {
    try {
      await performersService.toggleFavorite(id);
      setIsFavorite(!isFavorite);
      toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
    } catch (error) {
      toast.error('Please login to save favorites');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading performer..." />
      </div>
    );
  }

  if (!performer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Performer not found</h2>
          <Link to="/performers">
            <Button className="mt-4">Browse All Performers</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="h-64 bg-gradient-to-r from-red-500 to-pink-500"></div>
          <div className="px-8 py-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between">
              <div className="flex items-start gap-6">
                <img
                  src={performer.featuredImage || 'https://via.placeholder.com/150'}
                  alt={performer.stageName}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg -mt-20"
                />
                <div className="mt-2">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">{performer.stageName}</h1>
                    {performer.verified && (
                      <Badge variant="info">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                    {performer.premium && (
                      <Badge variant="warning">Premium</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-gray-600">
                    <Badge>{performer.genre}</Badge>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {performer.location}
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                      {performer.rating || 0} ({performer.totalReviews || 0} reviews)
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-4 md:mt-0">
                <Button variant="outline" onClick={handleToggleFavorite}>
                  <Heart className={`w-4 h-4 mr-2 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                  {isFavorite ? 'Saved' : 'Save'}
                </Button>
                <Button variant="outline">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
              <p className="text-gray-700 whitespace-pre-line">
                {performer.bio || 'No description available.'}
              </p>
            </Card>

            {/* Gallery - Coming Soon */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {performer.images && performer.images.length > 0 ? (
                  performer.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${performer.stageName} ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ))
                ) : (
                  <p className="text-gray-500 col-span-full text-center py-8">
                    No images available
                  </p>
                )}
              </div>
            </Card>

            {/* Reviews - Coming Soon */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Reviews</h2>
              <p className="text-gray-500 text-center py-8">
                Reviews coming soon
              </p>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card className="p-6 sticky top-4">
              <div className="mb-4">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-gray-900">
                    £{performer.priceMin}
                  </span>
                  {performer.priceMax && performer.priceMax !== performer.priceMin && (
                    <span className="text-lg text-gray-600 ml-1">
                      - £{performer.priceMax}
                    </span>
                  )}
                  <span className="text-gray-600 ml-2">
                    /{performer.priceUnit || 'event'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Average response: {performer.responseTime || 'within 24 hours'}
                </p>
              </div>

              <div className="space-y-3">
                <Link to={`/bookings/create?performer=${id}`}>
                  <Button variant="primary" size="lg" className="w-full">
                    <Calendar className="w-5 h-5 mr-2" />
                    Request Booking
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="w-full">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Total Bookings</span>
                  <span className="font-semibold">{performer.totalBookings || 0}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Profile Views</span>
                  <span className="font-semibold">{performer.totalViews || 0}</span>
                </div>
              </div>
            </Card>

            {/* Stats */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Info</h3>
              <div className="space-y-3 text-sm">
                {performer.yearsExperience && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Experience</span>
                    <span className="font-medium">{performer.yearsExperience} years</span>
                  </div>
                )}
                {performer.travelRadius && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Travel Radius</span>
                    <span className="font-medium">{performer.travelRadius} miles</span>
                  </div>
                )}
                {performer.languages && performer.languages.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Languages</span>
                    <span className="font-medium">{performer.languages.join(', ')}</span>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformerDetail;
