const db = require('./persistence')
import { DataTypes } from 'sequelize';
import Modelo from './modelo';

const Veiculo = sequelize.define('Veiculo', {
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
    tableName: 'Veiculo',
    timestamps: false,
});

export default Veiculo;