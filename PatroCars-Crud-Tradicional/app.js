//Inicializando o express
const express = require('express');
const app = express();
const { engine }= require('express-handlebars');
const bodyParser = require('body-parser')
const Montadora = require('./models/montadora');

//Configurando a template engine
app.engine('handlebars', engine({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,  // Desativa a verificação
        allowProtoMethodsByDefault: true       // Desativa a verificação
    }
}));
app.set('view engine', 'handlebars');

//Configurando o body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Rotas

//get montadoras
app.get('/montadoras', function(req, res){
    Montadora.findAll().then(function(montadoras){
        res.render('montadoras', {montadoras: montadoras});
    });   
});

//cadastrando montadora
app.get('/createMontadora', function(req, res){
   res.render('cadastroMontadora')
});

app.post('/cadastroMontadora', function(req, res){
    Montadora.create({
        nome: req.body.nome,
        pais: req.body.pais,
        ano_fundacao: req.body.ano_fundacao
    }).then(function(){
        res.redirect('/montadoras')
    }).catch(function(error){
        res.send('Montadora não cadastrada: ' + error)
    })
});

//Deletando montadora
app.get('/deletarMontadora/:id_montadora', function(req, res){
    Montadora.destroy({where: {'id_montadora': req.params.id_montadora}}).then(function(){
        res.send("Montadora deletada com sucesso");
    }).catch(function(error){
        res.send('Montadora não existe' + error);
    });
});


// app.post('/cadastroModelo', function(req, res){
//     Modelo.create({
        
//     }).then(function(){
//         res.send('Modelo cadastrado com sucesso!')
//     }).catch(function(error){
//         res.send('Modelo não cadastrado: ' + error)
//     })
// });

// app.post('/cadastroVeiculo', function(req, res){
//     Veiculo.create({
//         nome: req.body.nome,
//         pais: req.body.pais,
//         ano_fundacao: req.body.ano_fundacao
//     }).then(function(){
//         res.send('Veiculo cadastrado com sucesso!')
//     }).catch(function(error){
//         res.send('Veiculo não cadastrado: ' + error)
//     })
// });

//Inicializando o servidor na porta 3000
app.listen(3000, function(){
    console.log('Servidor rodando hein')
});