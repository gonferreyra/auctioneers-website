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
  },
  {
    tableName: 'appraisal_cases',
    timestamps: true,
  }
);

export default AppraisalCaseModel;
