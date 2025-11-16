import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  clientId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id'
    }
  },
  performerId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Performer',
      key: 'id'
    }
  },
  eventDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  eventStartTime: {
    type: DataTypes.TIME,
    allowNull: false
  },
  eventEndTime: {
    type: DataTypes.TIME,
    allowNull: true
  },
  eventDuration: {
    type: DataTypes.INTEGER, // in hours
    allowNull: true
  },
  eventType: {
    type: DataTypes.STRING,
    allowNull: true // e.g., "Wedding", "Corporate Event", "Birthday Party"
  },
  venue: {
    type: DataTypes.STRING,
    allowNull: false
  },
  venueAddress: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  eventDetails: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  guestCount: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM(
      'pending',
      'accepted',
      'declined',
      'cancelled',
      'completed',
      'disputed'
    ),
    defaultValue: 'pending'
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  platformFee: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  paymentStatus: {
    type: DataTypes.ENUM('pending', 'paid', 'refunded', 'failed'),
    defaultValue: 'pending'
  },
  paymentIntentId: {
    type: DataTypes.STRING,
    allowNull: true // Stripe payment intent ID
  },
  cancellationReason: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  cancelledBy: {
    type: DataTypes.UUID,
    allowNull: true
  },
  cancelledAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  acceptedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  completedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

export default Booking;
