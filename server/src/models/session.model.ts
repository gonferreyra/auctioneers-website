import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { DB } from '../config/db';
import { thirtyDaysFromNow } from '../utils/date';

interface ISessionModel
  extends Model<
    InferAttributes<ISessionModel>,
    InferCreationAttributes<ISessionModel>
  > {
  id?: number;
  userId: number;
  userAgent?: string;
  createdAt?: Date;
  expiresAt?: Date;
}

const SessionModel = DB.define<ISessionModel>(
  'Session',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    userAgent: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: thirtyDaysFromNow(),
    },
  },
  {
    tableName: 'sessions',
    timestamps: true,
  }
);

export default SessionModel;
