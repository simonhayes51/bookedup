import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Performer = sequelize.define('Performer', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  stageName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  genre: {
    type: DataTypes.ENUM('DJ', 'Singer', 'Band', 'Comedy', 'Other'),
    allowNull: false
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  priceMin: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  priceMax: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  priceUnit: {
    type: DataTypes.ENUM('hour', 'event', 'day'),
    defaultValue: 'event'
  },
  images: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  videos: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  featuredImage: {
    type: DataTypes.STRING,
    allowNull: true
  },
  socials: {
    type: DataTypes.JSONB,
    defaultValue: {
      instagram: null,
      facebook: null,
      youtube: null,
      website: null,
      twitter: null,
      tiktok: null
    }
  },
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  premium: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected', 'suspended'),
    defaultValue: 'pending'
  },
  responseTime: {
    type: DataTypes.STRING,
    defaultValue: 'within 24 hours'
  },
  rating: {
    type: DataTypes.DECIMAL(3, 2),
    defaultValue: 0.00,
    validate: {
      min: 0,
      max: 5
    }
  },
  totalReviews: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  totalBookings: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  totalViews: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  totalLikes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  availabilityCalendar: {
    type: DataTypes.JSONB,
    defaultValue: {}
  },
  services: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  equipment: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  travelRadius: {
    type: DataTypes.INTEGER, // in miles
    defaultValue: 50
  },
  languages: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: ['English']
  },
  yearsExperience: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
});

export default Performer;
