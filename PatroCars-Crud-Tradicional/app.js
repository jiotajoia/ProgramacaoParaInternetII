//Inicializando os modules
const express = require('express');
const app = express();
const { engine }= require('express-handlebars');
const bodyParser = require('body-parser')
const path = require("path");
const mongoose =  require('mongoose');
const session =  require('express-session');
const flash = require('connect-flash');
const Montadora = require('./models/montadora');
const Modelo = require('./models/modelo');
const Veiculo = require('./models/veiculo');
const usuarios = require('./routes/usuario')

//Configurando sessão
app.use(session({
    secret: "montadoraomaga",
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

//Configurando middleware
app.use((req, res, next)=>{
    res.locals.succes_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    next();
});

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

//Configurando o mongoose
mongoose.connect("mongodb://localhost/montadora").then(function(){
    console.log("Conectado ao mongoDB");
}).catch(function(error){
    console.log("Erro ao conectar com o mongo: "+error)
});

//media
app.use(express.static(path.join(__dirname, "media")))

//Rotas

app.get('/', function(req, res){
    res.render("index");
})

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

    var erros = [];

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Nome vazio"});
    }

    if(!req.body.pais || typeof req.body.pais == undefined || req.body.pais == null){
        erros.push({texto: "País vazio"});
    }

    if(!req.body.ano_fundacao || typeof req.body.ano_fundacao == undefined || req.body.ano_fundacao == null){
        erros.push({texto: "Ano de fundação vazio"});
    }

    if(erros.length > 0){
        res.render("/cadastroMontadora", {erros: erros})
    } else{
        Montadora.create({
            nome: req.body.nome,
            pais: req.body.pais,
            ano_fundacao: req.body.ano_fundacao
        }).then(function () {
            res.redirect('/montadoras')
        }).catch(function (error) {
            res.send('Montadora não cadastrada: ' + error)
        })
    }
});

//editar montadora
app.get('/editarMontadora/:id_montadora', function(req, res){
    Montadora.findOne({where: {id_montadora:req.params.id_montadora}}).then(function(montadora){
        res.render('editaMontadora', {montadora: montadora})
    }).catch(function(error){
        req.flash("error_msg", "Montadora não existe")
    });         
});

app.post("/editarMontadora", function(req, res){
    Montadora.findOne(({_id_montadora: req.body.id_montadora})).then(function(montadora){
        montadora.nome = req.body.nome
        montadora.pais = req.body.pais
        montadora.ano_fundacao = req.body.ano_fundacao
   
        montadora.save().then(function(){
            req.flash("success_msg", "Montadora editada");
            res.redirect('montadoras')
        }).catch(function(error){
            req.flash("error_msg", "Ocorreu um erro ao editar montadora")
        })
    }).catch(function(error){
        req.flash("error_msg", "houve um erro ao editar montadora");
        res.redirect("montadoras")
    });

});

//Deletando montadora
app.get('/deletarMontadora/:id_montadora', function(req, res){
    Montadora.destroy({where: {'id_montadora': req.params.id_montadora}}).then(function(){
        res.send("Montadora deletada com sucesso");
    }).catch(function(error){
        res.send('Montadora não existe' + error);
    });
});

//get modelos
app.get('/modelos', function(req, res){
    Montadora.findAll().then(function(modelos){
        res.render('modelos', {modelos: modelos});
    });   
});

//Cadastrando modelo
app.get('/createModelo', function(req, res){
    res.render('cadastroModelo')
});

app.post('/cadastroModelo', function (req, res) {
    var erros = [];

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Nome vazio"});
    }

    if(!req.body.motorizacao || typeof req.body.motorizacao == undefined || req.body.motorizacao == null){
        erros.push({texto: "Motorização vazio"});
    }

    if(!req.body.turbo || typeof req.body.turbo == undefined || req.body.turbo == null){
        erros.push({texto: "Turbo vazio"});
    }

    if(!req.body.automatico || typeof req.body.automatico == undefined || req.body.automatico == null){
        erros.push({texto: "Automatico vazio"});
    }

    if(erros.length > 0){
        res.render("/cadastroModelo", {erros: erros})
    } else {
        if(req.body.montadora_id){

        }
        Modelo.create({
            nome: req.body.nome,
            montadora_id: req.body.montadora_id,
            motorizacao: req.body.motorizacao,
            turbo: req.body.turbo,
            automatico: req.body.automatico
        }).then(function () {
            res.redirect('/modelos')
        }).catch(function (error) {
            res.send('Modelo não cadastrado: ' + error)
        })
    }

});

//Deletando modelos
app.get('/deletarModelo/:id_modelo', function(req, res){
    Montadora.destroy({where: {'id_modelo': req.params.id_modelo}}).then(function(){
        res.send("Modelo deletado com sucesso");
    }).catch(function(error){
        res.send('Modelo não existe' + error);
    });
});

//get veiculos
app.get('/veiculos', function(req, res){
    Montadora.findAll().then(function(veiculos){
        res.render('veiculos', {veiculos: veiculos});
    });   
});

//Cadastrando veiculo
app.get('/createVeiculo', function(req, res){
    res.render('cadastroVeiculo')
});

app.post('/cadastroVeiculo', function(req, res){
    var erros = [];

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Nome inválido"});
    }

    if(!req.body.modelo_id || typeof req.body.modelo_id == undefined || req.body.modelo_id == null){
        erros.push({texto: "Id do modelo inválido"});
    }

    if(erros.length > 0){
        res.render("/cadastroVeiculo", {erros: erros})
    } else{
        Veiculo.create({
            nome: req.body.nome,
            modelo_id: req.body.modelo_id,
            cor: req.body.cor,
            ano_fabricacao: req.body.ano_fabricacao,
            ano_modelo: req.body.ano_modelo,
            valor: req.body.valor,
            placa: req.body.placa,
            vendido: req.body.vendido
        }).then(function () {
            req.flash("success_msg", "Veículo criado com sucesso")
            res.redirect('/veiculos')
        }).catch(function (error) {
            req.flash("error_msg", "Veículo não foi criado")
            res.redirect("/")
        })
    }
   
});

//app.use('/usuarios', usuarios)

//função para verificar se o id da montadora existe
function verificaMontadora(idBuscado){
    Montadora.findAll().then(function(montadoras){
        var achado = 0;
        for(let montadora of montadoras){
            if(montadora.id_montadora == idBuscado){
                achado++;
            }
        }

        if(achado == 0){
            return false;
        }
        
        return true;
    });
}

//função para verificar se o id do modelo existe
function verificaModelo(idBuscado){
        Modelo.findAll().then(function(modelos){
            var achado = 0;
            for(let modelo of modelos){
                if(modelo.id_modelo == idBuscado){
                    achado++;
                }
            }
    
            if(achado == 0){
                return false;
            }
            
            return true;
        });
}

//Inicializando o servidor na porta 3000
const PORT = 3000;
app.listen(PORT, function(){
    console.log('Servidor rodando hein, porta: '+PORT)
});