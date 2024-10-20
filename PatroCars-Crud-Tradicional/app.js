//Inicializando os modules
const express = require('express');
const cors = require('cors');
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
//const usuarios = require('./routes/usuario')

app.use(cors());

app.use(cors({
    origin: "https://programacaoparainternetii.onrender.com/"
}));

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
// mongoose.connect("mongodb://localhost/montadora").then(function(){
//     console.log("Conectado ao mongoDB");
// }).catch(function(error){
//     console.log("Erro ao conectar com o mongo: "+error)
// });

//media
app.use(express.static(path.join(__dirname, "media")))

//Rotas

app.get('/', function(req, res){
    res.render("inicial", { title: 'Página Inicial', bodyClass: 'style/style'});
})

app.get('/create', function(req, res){
    res.render("create", { title: 'Create', bodyClass: 'style/style'})
})

app.get('/read', function(req, res){
    res.render("read", { title: 'Read', bodyClass: 'style/style'})
})

app.get('/update', function(req, res){
    res.render("update", { title: 'Update', bodyClass: 'style/style'})
})

app.get('/delete', function(req, res){
    res.render("delete", { title: 'Delete', bodyClass: 'style/style'})
})

//get montadoras
app.get('/montadoras', function(req, res){
    Montadora.findAll().then(function(montadoras){
        res.render('montadoras', { title: 'Montadoras', bodyClass: 'style/listar', montadoras: montadoras});
    });   
});

//cadastrando montadora
app.get('/createMontadora', function(req, res){
   res.render('cadastroMontadora', { title: 'Create Montadora', bodyClass: 'style/create'})
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
        res.render('editaMontadora', { title: 'Update Montadora', bodyClass: 'style/update', base:"http://localhost:3000/", montadora: montadora})
    }).catch(function(error){
        req.flash("error_msg", "Montadora não existe")
    });         
});

app.post("/editarMontadora", async function(req, res){

    try{
        console.log("ID da montadora:", req.body.id_montadora);

        const montadora = await Montadora.findByPk(req.body.id_montadora);

        if (montadora) {
            montadora.nome = req.body.nome
            montadora.pais = req.body.pais
            montadora.ano_fundacao = req.body.ano_fundacao

            await montadora.save()

            req.flash("success_msg", "Montadora editada");
            
            res.redirect('/montadoras')
        } else{
            req.flash("error_msg", "Ocorreu um erro ao editar montadora")
            res.redirect('/montadoras')
        }
    } catch(error){
        req.flash("error_msg", `houve um erro ao editar montadora: ${error}`);
    }

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
    Modelo.findAll().then(function(modelos){
        res.render('modelos', {bodyClass: 'style/listar', modelos: modelos});
    });   
});

//Cadastrando modelo
app.get('/createModelo', function(req, res){
    res.render('cadastroModelo', { title: 'Create Modelo', bodyClass: 'style/create'})
});

app.post('/cadastroModelo', async function (req, res) {
    var erros = [];

    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({ texto: "Nome vazio" });
    }

    if (!req.body.motorizacao || typeof req.body.motorizacao == undefined || req.body.motorizacao == null) {
        erros.push({ texto: "Motorização vazio" });
    }

    if (!req.body.turbo || typeof req.body.turbo == undefined || req.body.turbo == null) {
        erros.push({ texto: "Turbo vazio" });
    }

    if (!req.body.automatico || typeof req.body.automatico == undefined || req.body.automatico == null) {
        erros.push({ texto: "Automatico vazio" });
    }

    if (erros.length > 0) {
        res.render("/cadastroModelo", { erros: erros })
    } else {
        try {
            const montadoraExiste = await verificaMontadora(req.body.montadora_id);

             if (montadoraExiste) {

                await Modelo.create({
                    nome: req.body.nome,
                    montadora_id: req.body.montadora_id,
                    valor_referencia: req.body.valor_referencia,
                    motorizacao: req.body.motorizacao,
                    turbo: req.body.turbo,
                    automatico: req.body.automatico
                })

                res.redirect('/modelos')
            } else {
                res.flash("error_msg", 'Modelo não cadastrado: Montadora não encontrada')
            }

        } catch (error) {
            res.flash("error_msg", `Modelo não cadastrado: ${error}`)
            res.redirect("/")
        }

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
        res.render('veiculos', {bodyClass: 'style/listar', veiculos: veiculos});
    });   
});

//Cadastrando veiculo
app.get('/createVeiculo', function(req, res){
    res.render('cadastroVeiculo', { title: 'Create Montadora', bodyClass: 'style/create'})
});

app.post('/cadastroVeiculo', async function(req, res){
    var erros = [];

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Nome inválido"});
    }

    if(!req.body.modelo_id || typeof req.body.modelo_id == undefined || req.body.modelo_id == null){
        erros.push({texto: "Id do modelo inválido"});
    }

    if(!req.body.cor || typeof req.body.cor == undefined || req.body.cor == null){
        erros.push({texto: "Cor inválida"});
    }

    if(!req.body.ano_fabricacao || typeof req.body.ano_fabricacao == undefined || req.body.ano_fabricacao == null){
        erros.push({texto: "Ano de fabricação inválido"});
    }

    if(!req.body.ano_modelo || typeof req.body.ano_modelo == undefined || req.body.ano_modelo == null){
        erros.push({texto: "Ano de modelo inválido"});
    }

    if(!req.body.valor || typeof req.body.valor == undefined || req.body.valor == null){
        erros.push({texto: "Valor inválido"});
    }

    if(!req.body.placa || typeof req.body.placa == undefined || req.body.placa == null){
        erros.push({texto: "Placa inválida"});
    }

    if(!req.body.vendido || typeof req.body.vendido == undefined || req.body.vendido == null){
        erros.push({texto: "Valor inválido para vendido"});
    }

    if(erros.length > 0){
        res.render("/cadastroVeiculo", {erros: erros})
    } else{

        try{
            const modeloExiste = await verificaModelo(req.body.modelo_id);

            if(modeloExiste){

                await  Veiculo.create({
                    nome: req.body.nome,
                    modelo_id: req.body.modelo_id,
                    cor: req.body.cor,
                    ano_fabricacao: req.body.ano_fabricacao,
                    ano_modelo: req.body.ano_modelo,
                    valor: req.body.valor,
                    placa: req.body.placa,
                    vendido: req.body.vendido
                })

                res.redirect('/veiculos')

            } else{
                res.flash("error_msg", 'Veículo não cadastrado: Modelo não encontrado')
            }
        }catch (error){
            req.flash("error_msg", `Veículo não foi criado: ${error}`)
            res.redirect("/")
        }
    }
   
});

//app.use('/usuarios', usuarios)

//função para verificar se o id da montadora existe
async function verificaMontadora(idBuscado){

    try{
        const existe= await Montadora.findOne({ where: { id_montadora: idBuscado }})

        return existe ? true : false;
    } catch(error){
        req.flash("error_msg", "Montadora não encontrada" + error)
    }

}

//função para verificar se o id do modelo existe
async function verificaModelo(idBuscado){
    try{
        const existe= await Modelo.findOne({ where: { id_modelo: idBuscado }})

        return existe ? true : false;
    } catch(error){
        req.flash("error_msg", "Modelo não encontrada" + error)
    }
}

//Inicializando o servidor na porta 3000
const PORT = 3000;
app.listen(PORT, function(){
    console.log('Servidor rodando hein, porta: '+ PORT)
});