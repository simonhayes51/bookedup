import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Music, Mail, Lock, LogIn, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button, Input, Card } from '../../components/ui';
import { API_URL } from '../../config/api';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    try {
      await login(formData);
      navigate(from, { replace: true });
    } catch (error) {
      setErrors({ submit: error.message || 'Login failed' });
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = (provider) => {
    window.location.href = `${API_URL}/api/auth/${provider}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-900 bg-dots flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <div className="flex justify-center">
          <Link to="/" className="flex items-center space-x-3">
            <Music className="h-16 w-16 text-yellow-400 drop-shadow-[0_0_15px_rgba(255,255,0,0.8)]" />
            <span className="text-4xl font-black text-white uppercase neon-glow">BookedUp</span>
          </Link>
        </div>

        <h2 className="mt-8 text-center text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-cyan-400 to-yellow-400 uppercase tracking-wider">
          WELCOME BACK!
        </h2>
        <p className="mt-4 text-center text-lg text-white font-bold">
          Don't have an account?{' '}
          <Link to="/register" className="text-yellow-400 hover:text-cyan-400 transition-colors uppercase underline">
            Sign up for FREE!
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="px-4 py-8 sm:px-10 border-8 border-black bg-gradient-to-br from-pink-500 to-purple-600">
          {/* OAuth Buttons */}
          <div className="space-y-4">
            <button
              onClick={() => handleOAuthLogin('google')}
              className="w-full flex items-center justify-center px-6 py-4 border-4 border-black rounded-none retro-shadow bg-gradient-to-r from-yellow-400 to-orange-500 text-base font-black uppercase text-black hover:from-cyan-400 hover:to-blue-500 transition-all pulse-glow"
            >
              <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              GOOGLE LOGIN
            </button>

            <button
              onClick={() => handleOAuthLogin('facebook')}
              className="w-full flex items-center justify-center px-6 py-4 border-4 border-black rounded-none retro-shadow bg-gradient-to-r from-cyan-400 to-blue-600 text-base font-black uppercase text-white hover:from-pink-500 hover:to-purple-600 transition-all pulse-glow"
            >
              <svg className="w-6 h-6 mr-3" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              FACEBOOK LOGIN
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

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-6 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-600 p-6 border-4 border-black neon-border">
            {errors.submit && (
              <div className="bg-black border-4 border-yellow-400 text-yellow-400 px-4 py-3 rounded-none text-sm font-bold uppercase neon-glow-yellow">
                ⚠️ {errors.submit}
              </div>
            )}

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
              label="PASSWORD"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="••••••••"
              autoComplete="current-password"
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-5 w-5 text-pink-600 focus:ring-cyan-500 border-4 border-black rounded-none"
                />
                <label htmlFor="remember-me" className="ml-3 block text-sm font-bold uppercase text-black">
                  Remember me
                </label>
              </div>

              <Link
                to="/forgot-password"
                className="text-sm font-bold uppercase text-purple-600 hover:text-cyan-600 underline"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full text-lg"
            >
              <LogIn className="w-5 h-5 mr-2" />
              SIGN IN
            </Button>
          </form>
        </Card>

        <p className="mt-6 text-center text-sm font-bold text-white bg-black/40 px-6 py-3 border-4 border-cyan-400">
          By signing in, you agree to our{' '}
          <Link to="/terms" className="text-yellow-400 hover:text-pink-400 uppercase underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="text-yellow-400 hover:text-pink-400 uppercase underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
