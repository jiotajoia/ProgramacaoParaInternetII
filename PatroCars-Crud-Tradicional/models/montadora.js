const db = require('./persistence')
import { DataTypes } from 'sequelize';

const Montadora = sequelize.define('Montadora', {
  id_montadora: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  pais: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  ano_fundacao: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'Montadora',
  timestamps: false,  
});

export default Montadora;