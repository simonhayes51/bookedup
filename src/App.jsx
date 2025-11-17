import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Toast from './components/Toast';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/layout/Layout';
import PrivateRoute from './components/PrivateRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import Performers from './pages/Performers';
import PerformerDetail from './pages/PerformerDetail';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Messages from './pages/Messages';
import Settings from './pages/Settings';
import HowItWorks from './pages/HowItWorks';
import Pricing from './pages/Pricing';
import Analytics from './pages/Analytics';
import PerformerCalendar from './pages/PerformerCalendar';
import PackageBuilder from './pages/PackageBuilder';
import SmartReplies from './pages/SmartReplies';
import Verification from './pages/Verification';
import FinancialDashboard from './pages/FinancialDashboard';
import ProfileEditor from './pages/ProfileEditor';
import ReviewManagement from './pages/ReviewManagement';
import ClientBookingPortal from './pages/ClientBookingPortal';
import LeadManagement from './pages/LeadManagement';
import AdminDashboard from './pages/admin/AdminDashboard';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <Toast />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/performers" element={<Layout><Performers /></Layout>} />
            <Route path="/performers/:id" element={<Layout><PerformerDetail /></Layout>} />
            <Route path="/how-it-works" element={<Layout><HowItWorks /></Layout>} />
            <Route path="/pricing" element={<Layout><Pricing /></Layout>} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Layout><Dashboard /></Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/bookings"
              element={
                <PrivateRoute>
                  <Layout><Bookings /></Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/messages"
              element={
                <PrivateRoute>
                  <Layout><Messages /></Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <Layout><Settings /></Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/analytics"
              element={
                <PrivateRoute>
                  <Analytics />
                </PrivateRoute>
              }
            />
            <Route
              path="/calendar"
              element={
                <PrivateRoute>
                  <PerformerCalendar />
                </PrivateRoute>
              }
            />
            <Route
              path="/packages"
              element={
                <PrivateRoute>
                  <PackageBuilder />
                </PrivateRoute>
              }
            />
            <Route
              path="/smart-replies"
              element={
                <PrivateRoute>
                  <SmartReplies />
                </PrivateRoute>
              }
            />
            <Route
              path="/verification"
              element={
                <PrivateRoute>
                  <Verification />
                </PrivateRoute>
              }
            />
            <Route
              path="/financial"
              element={
                <PrivateRoute>
                  <FinancialDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile-editor"
              element={
                <PrivateRoute>
                  <ProfileEditor />
                </PrivateRoute>
              }
            />
            <Route
              path="/reviews"
              element={
                <PrivateRoute>
                  <ReviewManagement />
                </PrivateRoute>
              }
            />
            <Route
              path="/client-portal"
              element={
                <PrivateRoute>
                  <ClientBookingPortal />
                </PrivateRoute>
              }
            />
            <Route
              path="/leads"
              element={
                <PrivateRoute>
                  <LeadManagement />
                </PrivateRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/*"
              element={
                <PrivateRoute requireRole="admin">
                  <Layout><AdminDashboard /></Layout>
                </PrivateRoute>
              }
            />

            {/* 404 */}
            <Route path="/404" element={<Layout><NotFound /></Layout>} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
