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
import AppraisalCaseModel from './appraisalCase.model';

interface ICaseModel
  extends Model<
    InferAttributes<ICaseModel>,
    InferCreationAttributes<ICaseModel>
  > {
  id?: number;
  internNumber?: string;
  status: 'active' | 'paralyzed' | 'closed';
  record: string; // expte
  plaintiff: string; // actor
  defendant: string; // demandado
  type: string; // tipo de juicio
  court: string; // juzgado
  lawOffice?: string; // estudio
  debt?: number; // deuda
  caseType: 'vehicle' | 'property' | 'appraisal';
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
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
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
      type: DataTypes.ENUM('vehicle', 'property', 'appraisal'),
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
      beforeCreate: async (caseInstance) => {
        // get last internNumber
        const lastCase = await CaseModel.findOne({
          order: [['createdAt', 'DESC']],
        });

        const lastNumber = lastCase?.internNumber
          ? parseInt(lastCase.internNumber.replace(/\D/g, '')) || 0
          : 0;

        // Generate new internNumber
        const prefix =
          caseInstance.caseType === 'vehicle'
            ? 'JR'
            : caseInstance.caseType === 'property'
            ? 'JI'
            : 'T';

        caseInstance.internNumber = `${prefix}${lastNumber + 1}`;

        if (!caseInstance.internNumber) {
          throw new Error('Failed to generate internNumber');
        }
      },
    },
  }
);

CaseModel.hasOne(VehicleCaseModel, {
  foreignKey: 'caseInternNumber',
  as: 'vehicleDetails',
});

VehicleCaseModel.belongsTo(CaseModel, {
  foreignKey: 'caseInternNumber',
});

CaseModel.hasOne(PropertyCaseModel, {
  foreignKey: 'caseInternNumber',
  as: 'propertyDetails',
});

PropertyCaseModel.belongsTo(CaseModel, {
  foreignKey: 'caseInternNumber',
});

CaseModel.hasOne(AppraisalCaseModel, {
  foreignKey: 'caseInternNumber',
  as: 'appraisalDetails',
});

AppraisalCaseModel.belongsTo(CaseModel, {
  foreignKey: 'caseInternNumber',
});

CaseModel.hasMany(MovementModel, {
  foreignKey: 'caseInternNumber',
  as: 'movements', // Alias para incluir los movimientos en consultas
});

MovementModel.belongsTo(CaseModel, {
  foreignKey: 'caseInternNumber',
  as: 'case', // Alias para incluir el caso en consultas
});

export default CaseModel;
