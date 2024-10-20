//Conexão com banco de dados postgresql
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // Necessário se o Render ou outro serviço de hospedagem exige SSL
        },
    },
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    DataTypes: Sequelize.DataTypes
}
