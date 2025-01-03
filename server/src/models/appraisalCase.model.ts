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
  caseId: number;
}

const AppraisalCaseModel = DB.define(
  'AppraisalCase',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    caseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cases',
        key: 'id',
      },
    },
  },
  {
    tableName: 'appraisal_cases',
    timestamps: true,
  }
);

export default AppraisalCaseModel;
