var express = require('express');

var app = express();

app.get('/', function(req, res){
    res.sendFile(__dirname+'/pages/index.html');
});

app.get('/montadora/:veiculo/:modelo', function(req, res){
    res.send(req.params);
});


app.listen(3000, function(){
    console.log('Servidor rodando hein')
});