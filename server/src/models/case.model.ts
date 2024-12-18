import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { DB } from '../config/db';
import MovementModel from './movement.model';

interface ICaseModel
  extends Model<
    InferAttributes<ICaseModel>,
    InferCreationAttributes<ICaseModel>
  > {
  id?: number;
  intern_number: string;
  status: 'active' | 'paralyzed' | 'closed';
  record: string; // expte
  plaintiff: string; // actor
  defendant: string; // demandado
  type: string; // tipo de juicio
  court: string; // juzgado
  law_office: string; // estudio
  debt?: number; // deuda
  aps: Date; // fecha preventiva de subasta
  aps_expiresAt: Date; // fecha caducidad preventiva
  is_executed: boolean; // se ejecuta
  address: string; // domicilio
  account_dgr: string; // cuenta dgr
  nomenclature: string; // nomenclatura
  description: string; // descripcion
  createdAt?: Date;
  updatedAt?: Date;
  // movements: CaseMovement[]; // movimientos
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
    intern_number: {
      type: DataTypes.STRING(6),
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
    law_office: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    debt: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    aps: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    aps_expiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    is_executed: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    account_dgr: {
      type: DataTypes.STRING,
      allowNull: true,
      // validar el length
    },
    nomenclature: {
      type: DataTypes.STRING,
      allowNull: true,
      // validar el length
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
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
  }
);

CaseModel.hasMany(MovementModel, {
  foreignKey: 'case_id',
  as: 'movements', // Alias para incluir los movimientos en consultas
});

MovementModel.belongsTo(CaseModel, {
  foreignKey: 'case_id',
  as: 'case', // Alias para incluir el caso en consultas
});

export default CaseModel;
