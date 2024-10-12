const { sequelize, DataTypes} = require('./persistence')
import Montadora from './montadora';  // Importação para a Foreign Key

const Modelo = sequelize.define('modelo', {
    id_modelo: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    montadora_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Montadora,
            key: 'id_montadora',
        },
    },
    valor_referencia: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    motorizacao: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    turbo: {
        type: DataTypes.CHAR(1),
        allowNull: false,
    },
    automatico: {
        type: DataTypes.CHAR(1),
        allowNull: false,
    },
}, {
    tableName: 'modelo',
    timestamps: false,
    freezeTableName: true
});

module.exports = Modelo;