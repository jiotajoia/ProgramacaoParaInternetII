//Conexão com banco de dados postgresql
const Sequelize = require('sequelize');

const sequelize = new Sequelize('montadora','postgres','123456',{
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    DataTypes: Sequelize.DataTypes
}
