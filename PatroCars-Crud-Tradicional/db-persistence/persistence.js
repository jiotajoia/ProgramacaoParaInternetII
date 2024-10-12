const Sequelize = require('sequelize');

const sequelize = new Sequelize('montadora','postgres','123456',{
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(function(){
    console.log('Conexão foi estabelecida com sucesso.');
}).catch(function(error){
    console.error('Não foi possível se conectar ao banco de dados:', error);
});

