/**
 * Socket.io Service
 */

import { io } from 'socket.io-client';
import { WS_URL } from '../config/api';
import authService from './auth';

class SocketService {
  constructor() {
    this.socket = null;
    this.connected = false;
  }

  connect() {
    if (this.socket?.connected) {
      return this.socket;
    }

    const token = authService.getToken();
    if (!token) {
      console.warn('No auth token, cannot connect to socket');
      return null;
    }

    this.socket = io(WS_URL, {
      auth: { token },
      transports: ['websocket', 'polling'],
    });

    this.socket.on('connect', () => {
      console.log('✅ Socket connected');
      this.connected = true;
    });

    this.socket.on('disconnect', () => {
      console.log('❌ Socket disconnected');
      this.connected = false;
    });

    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.connected = false;
    }
  }

  emit(event, data) {
    if (this.socket?.connected) {
      this.socket.emit(event, data);
    } else {
      console.warn('Socket not connected, cannot emit:', event);
    }
  }

  on(event, callback) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  off(event, callback) {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }

  // Messaging events
  joinConversation(conversationId) {
    this.emit('join-conversation', conversationId);
  }

  leaveConversation(conversationId) {
    this.emit('leave-conversation', conversationId);
  }

  sendTyping(conversationId) {
    this.emit('typing', { conversationId });
  }

  stopTyping(conversationId) {
    this.emit('stop-typing', { conversationId });
  }

  // Event listeners
  onNewMessage(callback) {
    this.on('new-message', callback);
  }

  onNewBooking(callback) {
    this.on('new-booking', callback);
  }

  onBookingUpdated(callback) {
    this.on('booking-updated', callback);
  }

  onPaymentSuccess(callback) {
    this.on('payment-success', callback);
  }

  onPerformerStatusUpdated(callback) {
    this.on('performer-status-updated', callback);
  }

  onUserTyping(callback) {
    this.on('user-typing', callback);
  }

  onUserStopTyping(callback) {
    this.on('user-stop-typing', callback);
  }

  onUserOnline(callback) {
    this.on('user-online', callback);
  }
}

// Create singleton instance
const socketService = new SocketService();

export default socketService;
