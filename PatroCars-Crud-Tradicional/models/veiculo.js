const { sequelize, DataTypes} = require('./persistence')
import Modelo from './modelo';

const Veiculo = sequelize.define('veiculo', {
    id_veiculo: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    modelo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Modelo,
            key: 'id_modelo',
        },
    },
    cor: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    ano_fabricacao: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ano_modelo: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    valor: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    placa: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    vendido: {
        type: DataTypes.CHAR(1),
        allowNull: false,
    },
}, {
    tableName: 'veiculo',
    timestamps: false,
    freezeTableName: true
});

module.exports = Veiculo;