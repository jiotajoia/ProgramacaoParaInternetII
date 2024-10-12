const { sequelize, DataTypes} = require('./persistence')

const Montadora = sequelize.define('montadora', {
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
  tableName: 'montadora',
  timestamps: false,
  freezeTableName: true  
});

module.exports = Montadora;