import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { DB } from '../config/db';

interface IMovementModel
  extends Model<
    InferAttributes<IMovementModel>,
    InferCreationAttributes<IMovementModel>
  > {
  id?: number;
  case_id: number;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const MovementModel = DB.define<IMovementModel>(
  'Movement',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    case_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cases',
        key: 'id',
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'movements',
    timestamps: true,
  }
);

export default MovementModel;
