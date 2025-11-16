import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Favorite = sequelize.define('Favorite', {
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
  performerId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Performer',
      key: 'id'
    },
    onDelete: 'CASCADE'
  }
}, {
  indexes: [
    {
      unique: true,
      fields: ['userId', 'performerId']
    }
  ]
});

export default Favorite;
