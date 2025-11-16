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
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-900 bg-dots flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
          <div className="flex justify-center">
            <Link to="/" className="flex items-center space-x-3">
              <Music className="h-16 w-16 text-yellow-400 drop-shadow-[0_0_15px_rgba(255,255,0,0.8)]" />
              <span className="text-4xl font-black text-white uppercase neon-glow">BookedUp</span>
            </Link>
          </div>

          <h2 className="mt-8 text-center text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-cyan-400 to-yellow-400 uppercase tracking-wider">
            JOIN BOOKEDUP!
          </h2>
          <p className="mt-4 text-center text-lg font-bold text-white">
            How would you like to use BookedUp? 🎉
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
            {/* Client Card */}
            <Card
              hover
              onClick={() => setRole('client')}
              className="p-8 cursor-pointer bg-gradient-to-br from-cyan-400 to-blue-600 border-8 border-black hover:scale-105 transition-transform"
            >
              <div className="text-center">
                <div className="mx-auto h-20 w-20 bg-yellow-400 border-4 border-black flex items-center justify-center">
                  <Briefcase className="h-10 w-10 text-black" />
                </div>
                <h3 className="mt-6 text-2xl font-black uppercase text-white">
                  I'M A CLIENT
                </h3>
                <p className="mt-3 text-sm font-bold text-black bg-white/90 px-3 py-2">
                  Book talented performers for your events!
                </p>
                <ul className="mt-6 space-y-3 text-sm font-bold text-white text-left">
                  <li className="flex items-start bg-black/20 px-3 py-2">
                    <span className="text-yellow-400 mr-2 text-lg">✓</span>
                    <span>Browse THOUSANDS of performers</span>
                  </li>
                  <li className="flex items-start bg-black/20 px-3 py-2">
                    <span className="text-yellow-400 mr-2 text-lg">✓</span>
                    <span>Secure booking & payments</span>
                  </li>
                  <li className="flex items-start bg-black/20 px-3 py-2">
                    <span className="text-yellow-400 mr-2 text-lg">✓</span>
                    <span>Direct messaging with artists</span>
                  </li>
                  <li className="flex items-start bg-black/20 px-3 py-2">
                    <span className="text-yellow-400 mr-2 text-lg">✓</span>
                    <span>Read VERIFIED reviews</span>
                  </li>
                </ul>
                <Button
                  variant="secondary"
                  className="w-full mt-6"
                  onClick={() => setRole('client')}
                >
                  CONTINUE AS CLIENT
                </Button>
              </div>
            </Card>

            {/* Performer Card */}
            <Card
              hover
              onClick={() => setRole('performer')}
              className="p-8 cursor-pointer bg-gradient-to-br from-pink-500 to-purple-600 border-8 border-black hover:scale-105 transition-transform"
            >
              <div className="text-center">
                <div className="mx-auto h-20 w-20 bg-yellow-400 border-4 border-black flex items-center justify-center">
                  <Music className="h-10 w-10 text-black" />
                </div>
                <h3 className="mt-6 text-2xl font-black uppercase text-white">
                  I'M A PERFORMER
                </h3>
                <p className="mt-3 text-sm font-bold text-black bg-white/90 px-3 py-2">
                  Get booked for AWESOME events!
                </p>
                <ul className="mt-6 space-y-3 text-sm font-bold text-white text-left">
                  <li className="flex items-start bg-black/20 px-3 py-2">
                    <span className="text-yellow-400 mr-2 text-lg">✓</span>
                    <span>Create your profile for FREE</span>
                  </li>
                  <li className="flex items-start bg-black/20 px-3 py-2">
                    <span className="text-yellow-400 mr-2 text-lg">✓</span>
                    <span>Get discovered by clients</span>
                  </li>
                  <li className="flex items-start bg-black/20 px-3 py-2">
                    <span className="text-yellow-400 mr-2 text-lg">✓</span>
                    <span>Manage bookings EASILY</span>
                  </li>
                  <li className="flex items-start bg-black/20 px-3 py-2">
                    <span className="text-yellow-400 mr-2 text-lg">✓</span>
                    <span>Secure payments GUARANTEED</span>
                  </li>
                </ul>
                <Button
                  variant="secondary"
                  className="w-full mt-6"
                  onClick={() => setRole('performer')}
                >
                  CONTINUE AS PERFORMER
                </Button>
              </div>
            </Card>
          </div>

          <p className="mt-6 text-center text-lg font-bold text-white bg-black/40 px-6 py-3 border-4 border-pink-500">
            Already have an account?{' '}
            <Link to="/login" className="text-yellow-400 hover:text-cyan-400 uppercase underline">
              SIGN IN HERE!
            </Link>
          </p>
        </div>
      </div>
    );
  }

  // Step 2: Registration Form
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-900 bg-dots flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link to="/" className="flex items-center space-x-3">
            <Music className="h-16 w-16 text-yellow-400 drop-shadow-[0_0_15px_rgba(255,255,0,0.8)]" />
            <span className="text-4xl font-black text-white uppercase neon-glow">BookedUp</span>
          </Link>
        </div>

        <h2 className="mt-8 text-center text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-cyan-400 to-yellow-400 uppercase tracking-wider">
          CREATE YOUR {role} ACCOUNT
        </h2>
        <p className="mt-4 text-center text-lg font-bold text-white">
          Already have an account?{' '}
          <Link to="/login" className="text-yellow-400 hover:text-cyan-400 uppercase underline">
            SIGN IN!
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="px-4 py-8 sm:px-10 border-8 border-black bg-gradient-to-br from-pink-500 to-purple-600">
          {/* OAuth Buttons */}
          <div className="space-y-4">
            <button
              onClick={() => handleOAuthRegister('google')}
              className="w-full flex items-center justify-center px-6 py-4 border-4 border-black rounded-none retro-shadow bg-gradient-to-r from-yellow-400 to-orange-500 text-base font-black uppercase text-black hover:from-cyan-400 hover:to-blue-500 transition-all pulse-glow"
            >
              <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              GOOGLE SIGNUP
            </button>

            <button
              onClick={() => handleOAuthRegister('facebook')}
              className="w-full flex items-center justify-center px-6 py-4 border-4 border-black rounded-none retro-shadow bg-gradient-to-r from-cyan-400 to-blue-600 text-base font-black uppercase text-white hover:from-pink-500 hover:to-purple-600 transition-all pulse-glow"
            >
              <svg className="w-6 h-6 mr-3" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              FACEBOOK SIGNUP
            </button>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-4 border-black" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-black text-yellow-400 font-black uppercase border-4 border-yellow-400 neon-glow-yellow">OR USE EMAIL</span>
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-600 p-6 border-4 border-black neon-border">
            {errors.submit && (
              <div className="bg-black border-4 border-yellow-400 text-yellow-400 px-4 py-3 rounded-none text-sm font-bold uppercase neon-glow-yellow">
                ⚠️ {errors.submit}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="FIRST NAME"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                error={errors.firstName}
                placeholder="John"
                autoComplete="given-name"
              />

              <Input
                label="LAST NAME"
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
              label="EMAIL ADDRESS"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="you@example.com"
              autoComplete="email"
            />

            <Input
              label="PHONE (OPTIONAL)"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              placeholder="+44 7XXX XXXXXX"
              autoComplete="tel"
            />

            <Input
              label="PASSWORD"
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
              label="CONFIRM PASSWORD"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              placeholder="••••••••"
              autoComplete="new-password"
            />

            <div className="flex items-center bg-cyan-100 px-4 py-3 border-2 border-black">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-5 w-5 text-pink-600 focus:ring-cyan-500 border-4 border-black rounded-none"
              />
              <label htmlFor="terms" className="ml-3 block text-sm font-bold text-black">
                I agree to the{' '}
                <Link to="/terms" className="text-purple-600 hover:text-cyan-600 underline uppercase">
                  Terms
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-purple-600 hover:text-cyan-600 underline uppercase">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full text-lg"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              CREATE ACCOUNT
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Register;
