import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import session from 'express-session';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

// Import passport
import passport from './config/passport.js';

// Import database
import sequelize from './config/database.js';

// Import routes
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import performerRoutes from './routes/performers.js';
import bookingRoutes from './routes/bookings.js';
import messageRoutes from './routes/messages.js';
import reviewRoutes from './routes/reviews.js';
import adminRoutes from './routes/admin.js';
import paymentRoutes from './routes/payments.js';

// Import middleware
import { errorHandler } from './middleware/errorHandler.js';
import { rateLimiter } from './middleware/rateLimiter.js';

// Import socket handlers
import { initializeSocket } from './socket/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);

// Initialize Socket.io
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

initializeSocket(io);

// Make io accessible in routes
app.set('io', io);

// Middleware
app.use(helmet({
  contentSecurityPolicy: false, // Configure properly in production
  crossOriginEmbedderPolicy: false
}));

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Session middleware (required for OAuth)
app.use(session({
  secret: process.env.SESSION_SECRET || 'bookedup-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Apply rate limiting
app.use('/api/', rateLimiter);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/performers', performerRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/payments', paymentRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Database connection and server start
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    // Sync database models (use { force: true } to drop and recreate in dev)
    // WARNING: force: true will DROP all tables
    await sequelize.sync({ alter: true });
    console.log('✅ Database models synchronized.');

    // Start server
    httpServer.listen(PORT, () => {
      console.log(`
╔════════════════════════════════════════╗
║   🎭 BookedUp Server Running           ║
║   📍 Port: ${PORT}                      ║
║   🌍 Environment: ${process.env.NODE_ENV || 'development'}    ║
║   🔗 API: http://localhost:${PORT}/api  ║
╚════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error('❌ Unable to start server:', error);
    process.exit(1);
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err);
  // Close server & exit process
  httpServer.close(() => process.exit(1));
});

// Handle SIGTERM
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received. Shutting down gracefully...');
  httpServer.close(() => {
    console.log('✅ Process terminated');
  });
});

startServer();

export default app;
