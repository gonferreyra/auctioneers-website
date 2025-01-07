import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { DB } from '../config/db';

interface IAppraisalCaseModel
  extends Model<
    InferAttributes<IAppraisalCaseModel>,
    InferCreationAttributes<IAppraisalCaseModel>
  > {
  id?: number;
  caseInternNumber: string;
  itemToAppraise?: string;
}

const AppraisalCaseModel = DB.define(
  'AppraisalCase',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    caseInternNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'cases',
        key: 'internNumber',
      },
    },
    itemToAppraise: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'appraisal_cases',
    timestamps: true,
  }
);

export default AppraisalCaseModel;
