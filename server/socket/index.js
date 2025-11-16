import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

export const initializeSocket = (io) => {
  // Middleware to authenticate socket connections
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;

      if (!token) {
        return next(new Error('Authentication error'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findByPk(decoded.id, {
        attributes: { exclude: ['password'] }
      });

      if (!user || !user.isActive) {
        return next(new Error('Authentication error'));
      }

      socket.user = user;
      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`✅ User connected: ${socket.user.id}`);

    // Join user's personal room for notifications
    socket.join(`user-${socket.user.id}`);

    // Handle typing indicator
    socket.on('typing', (data) => {
      socket.to(`conversation-${data.conversationId}`).emit('user-typing', {
        userId: socket.user.id,
        conversationId: data.conversationId
      });
    });

    socket.on('stop-typing', (data) => {
      socket.to(`conversation-${data.conversationId}`).emit('user-stop-typing', {
        userId: socket.user.id,
        conversationId: data.conversationId
      });
    });

    // Join conversation room
    socket.on('join-conversation', (conversationId) => {
      socket.join(`conversation-${conversationId}`);
      console.log(`User ${socket.user.id} joined conversation ${conversationId}`);
    });

    // Leave conversation room
    socket.on('leave-conversation', (conversationId) => {
      socket.leave(`conversation-${conversationId}`);
      console.log(`User ${socket.user.id} left conversation ${conversationId}`);
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log(`❌ User disconnected: ${socket.user.id}`);
    });

    // Emit online status
    socket.broadcast.emit('user-online', { userId: socket.user.id });
  });

  return io;
};
