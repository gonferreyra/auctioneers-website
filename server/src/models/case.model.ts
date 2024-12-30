import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { DB } from '../config/db';
import MovementModel from './movement.model';
import VehicleCaseModel from './vehicleCase.mode';
import PropertyCaseModel from './propertyCase.model';

interface ICaseModel
  extends Model<
    InferAttributes<ICaseModel>,
    InferCreationAttributes<ICaseModel>
  > {
  id?: number;
  internNumber: string;
  status: 'active' | 'paralyzed' | 'closed';
  record: string; // expte
  plaintiff: string; // actor
  defendant: string; // demandado
  type: string; // tipo de juicio
  court: string; // juzgado
  lawOffice?: string; // estudio
  debt?: number; // deuda
  caseType: 'car' | 'property' | 'appraisal';
  createdAt?: Date;
  updatedAt?: Date;
}

const CaseModel = DB.define<ICaseModel>(
  'Case',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    internNumber: {
      type: DataTypes.STRING(4),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'active',
    },
    record: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isLength: {
          min: 5,
          max: 8, // check this data
        },
      },
    },
    plaintiff: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    defendant: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    court: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lawOffice: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    debt: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    caseType: {
      type: DataTypes.ENUM('car', 'property', 'appraisal'),
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
    tableName: 'cases',
    timestamps: true,
    hooks: {
      beforeCreate: (caseInstance) => {
        caseInstance.internNumber = caseInstance.internNumber.toUpperCase();
      },
    },
  }
);

CaseModel.hasOne(VehicleCaseModel, {
  foreignKey: 'caseId',
  as: 'vehicleDetails',
});

VehicleCaseModel.belongsTo(CaseModel, {
  foreignKey: 'caseId',
});

CaseModel.hasOne(PropertyCaseModel, {
  foreignKey: 'caseId',
  as: 'propertyDetails',
});

PropertyCaseModel.belongsTo(CaseModel, {
  foreignKey: 'caseId',
});

CaseModel.hasMany(MovementModel, {
  foreignKey: 'caseId',
  as: 'movements', // Alias para incluir los movimientos en consultas
});

MovementModel.belongsTo(CaseModel, {
  foreignKey: 'caseId',
  as: 'case', // Alias para incluir el caso en consultas
});

export default CaseModel;
