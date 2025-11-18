import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Music, Mail, Lock, User, Phone, UserPlus, Briefcase, Users, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button, Input, Card } from '../../components/ui';
import { API_URL } from '../../config/api';

const Register = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { register, demoLogin } = useAuth();

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

  const handleDemoLogin = async (type) => {
    setLoading(true);
    try {
      await demoLogin(type);
      navigate('/dashboard');
    } catch (error) {
      setErrors({ submit: 'Demo login failed' });
    } finally {
      setLoading(false);
    }
  };

  // Step 1: Choose Role
  if (step === 1 && !role) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-2xl px-4">
          <div className="flex justify-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Music className="h-7 w-7 text-white" />
              </div>
              <span className="text-3xl font-bold gradient-text">BookedUp</span>
            </Link>
          </div>

          <h2 className="mt-8 text-center text-4xl md:text-5xl font-bold text-white mb-4">
            Join BookedUp
          </h2>
          <p className="text-center text-gray-300 mb-8">
            How would you like to use BookedUp?
          </p>

          {/* Demo Login Options */}
          <div className="mb-8">
            <div className="text-center mb-4">
              <span className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-semibold border border-purple-500/30">
                <Zap className="w-4 h-4" />
                Try Demo Account
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <Button
                onClick={() => handleDemoLogin('performer')}
                disabled={loading}
                className="btn-secondary flex items-center justify-center gap-2"
              >
                <Music className="w-4 h-4" />
                Performer Demo
              </Button>
              <Button
                onClick={() => handleDemoLogin('client')}
                disabled={loading}
                className="btn-secondary flex items-center justify-center gap-2"
              >
                <Users className="w-4 h-4" />
                Client Demo
              </Button>
            </div>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-slate-900 text-gray-400">Or create an account</span>
            </div>
          </div>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-2xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Client Card */}
            <div
              onClick={() => setRole('client')}
              className="card-solid cursor-pointer hover:border-purple-500 transition-all p-8 hover-lift"
            >
              <div className="text-center">
                <div className="mx-auto h-16 w-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                  <Briefcase className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  I'm a Client
                </h3>
                <p className="text-sm text-gray-400 mb-6">
                  Book talented performers for your events
                </p>
                <ul className="space-y-2 text-sm text-gray-300 text-left mb-6">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>Browse thousands of performers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>Secure booking & payments</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>Direct messaging with artists</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>Verified reviews</span>
                  </li>
                </ul>
                <Button
                  className="btn-secondary w-full"
                  onClick={() => setRole('client')}
                >
                  Continue as Client
                </Button>
              </div>
            </div>

            {/* Performer Card */}
            <div
              onClick={() => setRole('performer')}
              className="card-solid cursor-pointer hover:border-purple-500 transition-all p-8 hover-lift"
            >
              <div className="text-center">
                <div className="mx-auto h-16 w-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                  <Music className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  I'm a Performer
                </h3>
                <p className="text-sm text-gray-400 mb-6">
                  Get booked for events
                </p>
                <ul className="space-y-2 text-sm text-gray-300 text-left mb-6">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>Create your profile for free</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>Get discovered by clients</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>Manage bookings easily</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>Secure payments guaranteed</span>
                  </li>
                </ul>
                <Button
                  className="btn-primary w-full"
                  onClick={() => setRole('performer')}
                >
                  Continue as Performer
                </Button>
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-400 hover:text-purple-300 font-semibold">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    );
  }

  // Step 2: Registration Form
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="flex justify-center">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Music className="h-7 w-7 text-white" />
            </div>
            <span className="text-3xl font-bold gradient-text">BookedUp</span>
          </Link>
        </div>

        <h2 className="mt-8 text-center text-3xl md:text-4xl font-bold text-white mb-2">
          Create Your Account
        </h2>
        <p className="text-center text-gray-300 mb-8">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-400 hover:text-purple-300 font-semibold">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="card-elevated">
          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.submit && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
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
              label="Phone (Optional)"
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

            <div className="flex items-center bg-slate-700/50 px-4 py-3 rounded-lg border border-slate-600">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded bg-slate-700"
              />
              <label htmlFor="terms" className="ml-3 block text-sm text-gray-300">
                I agree to the{' '}
                <Link to="/terms" className="text-purple-400 hover:text-purple-300">
                  Terms
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-purple-400 hover:text-purple-300">
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
        </div>
      </div>
    </div>
  );
};

export default Register;
