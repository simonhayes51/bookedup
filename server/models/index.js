import sequelize from '../config/database.js';
import User from './User.js';
import Performer from './Performer.js';
import Booking from './Booking.js';
import { Message, Conversation } from './Message.js';
import Review from './Review.js';
import Favorite from './Favorite.js';

// Define associations

// User - Performer (1:1)
User.hasOne(Performer, {
  foreignKey: 'userId',
  as: 'performerProfile'
});
Performer.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

// User - Booking
User.hasMany(Booking, {
  foreignKey: 'clientId',
  as: 'clientBookings'
});
Booking.belongsTo(User, {
  foreignKey: 'clientId',
  as: 'client'
});

// Performer - Booking
Performer.hasMany(Booking, {
  foreignKey: 'performerId',
  as: 'performerBookings'
});
Booking.belongsTo(Performer, {
  foreignKey: 'performerId',
  as: 'performer'
});

// Conversation - User
Conversation.belongsTo(User, {
  foreignKey: 'participant1Id',
  as: 'participant1'
});
Conversation.belongsTo(User, {
  foreignKey: 'participant2Id',
  as: 'participant2'
});

User.hasMany(Conversation, {
  foreignKey: 'participant1Id',
  as: 'conversations1'
});
User.hasMany(Conversation, {
  foreignKey: 'participant2Id',
  as: 'conversations2'
});

// Message - Conversation
Conversation.hasMany(Message, {
  foreignKey: 'conversationId',
  as: 'messages'
});
Message.belongsTo(Conversation, {
  foreignKey: 'conversationId',
  as: 'conversation'
});

// Message - User (sender)
User.hasMany(Message, {
  foreignKey: 'senderId',
  as: 'sentMessages'
});
Message.belongsTo(User, {
  foreignKey: 'senderId',
  as: 'sender'
});

// Review - User
User.hasMany(Review, {
  foreignKey: 'reviewerId',
  as: 'reviewsWritten'
});
Review.belongsTo(User, {
  foreignKey: 'reviewerId',
  as: 'reviewer'
});

// Review - Performer
Performer.hasMany(Review, {
  foreignKey: 'performerId',
  as: 'reviews'
});
Review.belongsTo(Performer, {
  foreignKey: 'performerId',
  as: 'performer'
});

// Review - Booking
Booking.hasOne(Review, {
  foreignKey: 'bookingId',
  as: 'review'
});
Review.belongsTo(Booking, {
  foreignKey: 'bookingId',
  as: 'booking'
});

// Favorite - User
User.hasMany(Favorite, {
  foreignKey: 'userId',
  as: 'favorites'
});
Favorite.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

// Favorite - Performer
Performer.hasMany(Favorite, {
  foreignKey: 'performerId',
  as: 'favoritedBy'
});
Favorite.belongsTo(Performer, {
  foreignKey: 'performerId',
  as: 'performer'
});

export {
  sequelize,
  User,
  Performer,
  Booking,
  Message,
  Conversation,
  Review,
  Favorite
};
