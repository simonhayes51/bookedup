import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Music, Mail, Lock, User, Phone, UserPlus, Briefcase } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button, Input, Card } from '../../components/ui';
import { API_URL } from '../../config/api';

const Register = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { register } = useAuth();

  const [step, setStep] = useState(1);
  const [role, setRole] = useState(searchParams.get('type') || '');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        role: role,
      });
      navigate('/dashboard');
    } catch (error) {
      setErrors({ submit: error.message || 'Registration failed' });
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthRegister = (provider) => {
    window.location.href = `${API_URL}/api/auth/${provider}`;
  };

  // Step 1: Choose Role
  if (step === 1 && !role) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
          <div className="flex justify-center">
            <Link to="/" className="flex items-center space-x-2">
              <Music className="h-12 w-12 text-red-600" />
              <span className="text-3xl font-bold text-gray-900">BookedUp</span>
            </Link>
          </div>

          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Join BookedUp
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            How would you like to use BookedUp?
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
            {/* Client Card */}
            <Card
              hover
              onClick={() => setRole('client')}
              className="p-8 cursor-pointer hover:border-red-500 transition-all"
            >
              <div className="text-center">
                <div className="mx-auto h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
                  <Briefcase className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                  I'm a Client
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Book talented performers for your events
                </p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600 text-left">
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✓</span>
                    <span>Browse thousands of performers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✓</span>
                    <span>Secure booking & payments</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✓</span>
                    <span>Direct messaging with artists</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✓</span>
                    <span>Read verified reviews</span>
                  </li>
                </ul>
                <Button
                  variant="primary"
                  className="w-full mt-6"
                  onClick={() => setRole('client')}
                >
                  Continue as Client
                </Button>
              </div>
            </Card>

            {/* Performer Card */}
            <Card
              hover
              onClick={() => setRole('performer')}
              className="p-8 cursor-pointer hover:border-red-500 transition-all"
            >
              <div className="text-center">
                <div className="mx-auto h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
                  <Music className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                  I'm a Performer
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Get booked for amazing events
                </p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600 text-left">
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✓</span>
                    <span>Create your profile for free</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✓</span>
                    <span>Get discovered by clients</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✓</span>
                    <span>Manage bookings easily</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✓</span>
                    <span>Secure payments guaranteed</span>
                  </li>
                </ul>
                <Button
                  variant="primary"
                  className="w-full mt-6"
                  onClick={() => setRole('performer')}
                >
                  Continue as Performer
                </Button>
              </div>
            </Card>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-red-600 hover:text-red-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    );
  }

  // Step 2: Registration Form
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link to="/" className="flex items-center space-x-2">
            <Music className="h-12 w-12 text-red-600" />
            <span className="text-3xl font-bold text-gray-900">BookedUp</span>
          </Link>
        </div>

        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Create your {role} account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-red-600 hover:text-red-500">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="px-4 py-8 sm:px-10">
          {/* OAuth Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => handleOAuthRegister('google')}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Sign up with Google
            </button>

            <button
              onClick={() => handleOAuthRegister('facebook')}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Sign up with Facebook
            </button>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or sign up with email</span>
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {errors.submit}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                error={errors.firstName}
                placeholder="John"
                autoComplete="given-name"
              />

              <Input
                label="Last Name"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                error={errors.lastName}
                placeholder="Doe"
                autoComplete="family-name"
              />
            </div>

            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="you@example.com"
              autoComplete="email"
            />

            <Input
              label="Phone Number (Optional)"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              placeholder="+44 7XXX XXXXXX"
              autoComplete="tel"
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="••••••••"
              autoComplete="new-password"
              helper="Must be at least 6 characters"
            />

            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              placeholder="••••••••"
              autoComplete="new-password"
            />

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                I agree to the{' '}
                <Link to="/terms" className="text-red-600 hover:text-red-500">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-red-600 hover:text-red-500">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Create Account
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Register;
