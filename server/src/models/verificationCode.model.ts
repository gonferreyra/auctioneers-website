import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { DB } from '../config/db';
import VerificationCodeType from '../constants/verificationCodeType';

interface IVerificationCode
  extends Model<
    InferAttributes<IVerificationCode>,
    InferCreationAttributes<IVerificationCode>
  > {
  id?: number;
  userId: number;
  type: VerificationCodeType;
  createdAt?: Date;
  expiresAt: Date;
}

const VerificationCodeModel = DB.define<IVerificationCode>(
  'VerificationCode',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'verification_codes',
    timestamps: true,
  }
);

export default VerificationCodeModel;
