//Inicializando o express
const express = require('express');
const app = express();
const { engine }= require('express-handlebars');
const bodyParser = require('body-parser')

//Configurando a template engine
app.engine('handlebars', engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars');

//Configurando o body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Rotas
app.get('/montadoras', function(req, res){
    res.render('cadastroMontadora')
});

app.post('/cadastroMontadora', function(req, res){
    res.send('Montadora ' + req.body.nome + ' cadastrada com sucesso');
});

//Inicializando o servidor na porta 3000
app.listen(3000, function(){
    console.log('Servidor rodando hein')
});