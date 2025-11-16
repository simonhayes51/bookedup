import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Music, Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button, Input, Card } from '../../components/ui';
import authService from '../../services/auth';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Email is required');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
      return;
    }

    setLoading(true);
    try {
      await authService.forgotPassword(email);
      setSent(true);
      toast.success('Password reset email sent!');
    } catch (err) {
      setError(err.message || 'Failed to send reset email');
      toast.error('Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <Link to="/" className="flex items-center space-x-2">
              <Music className="h-12 w-12 text-red-600" />
              <span className="text-3xl font-bold text-gray-900">BookedUp</span>
            </Link>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <Card className="px-4 py-8 sm:px-10 text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>

            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              Check your email
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              We've sent a password reset link to:
            </p>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {email}
            </p>

            <p className="mt-4 text-sm text-gray-600">
              Click the link in the email to reset your password. The link will expire in 1 hour.
            </p>

            <div className="mt-6 space-y-3">
              <Link to="/login">
                <Button variant="primary" className="w-full">
                  Back to Sign In
                </Button>
              </Link>

              <button
                onClick={() => setSent(false)}
                className="w-full text-sm text-gray-600 hover:text-gray-900"
              >
                Didn't receive the email? Try again
              </button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

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
          Reset your password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter your email and we'll send you a reset link
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="px-4 py-8 sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              autoFocus
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full"
            >
              <Mail className="w-5 h-5 mr-2" />
              Send Reset Link
            </Button>

            <Link
              to="/login"
              className="flex items-center justify-center text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Sign In
            </Link>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
