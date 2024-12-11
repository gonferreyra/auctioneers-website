import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Optional,
} from 'sequelize';
import { DB } from '../config/db';
import { hashValue } from '../utils/bcrypt';
import VerificationCodeModel from './verificationCode.model';
import SessionModel from './session.model';

// Define el tipo para el modelo
interface IUserModel
  extends Model<
    InferAttributes<IUserModel>,
    InferCreationAttributes<IUserModel>
  > {
  id?: number;
  email: string;
  password: string;
  verified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserModel = DB.define<IUserModel>(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
    tableName: 'users',
    timestamps: true,
    hooks: {
      beforeCreate: async (user) => {
        const hashedPassword = await hashValue(user.password);
        user.password = hashedPassword;
      },
    },
    defaultScope: {
      attributes: { exclude: ['password'] },
    },
    // we keep this code for future use if needed
    // scopes: {
    //   withPassword: {} // scope to include password if needed
    // }
  }
);

// Custom method on the model instance
UserModel.prototype.toJSON = function () {
  const values = { ...this.get() };

  delete values.password; // delete password
  return values;
};

// Relations User => Session
UserModel.hasMany(SessionModel, {
  foreignKey: 'userId',
});
SessionModel.belongsTo(UserModel, {
  foreignKey: 'userId',
});

// Relations User => VerificationCode
UserModel.hasMany(VerificationCodeModel, {
  foreignKey: 'userId',
});
VerificationCodeModel.belongsTo(UserModel, {
  foreignKey: 'userId',
});

export default UserModel;
