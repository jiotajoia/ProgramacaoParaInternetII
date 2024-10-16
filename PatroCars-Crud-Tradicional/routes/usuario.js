const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/usuario');
const Usuario =  mongoose.model('usuarios');
const bcrypt = require('bcrypt')

router.get('/registro', function(req, res){
    res.render('usuarios/registro')
});

router.post('/registro', function(req, res){
    var erros = [];

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "nome invalido"})
    }

    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
        erros.push({texto: "email invalido"})
    }

    if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
        erros.push({texto: "senha invalida"})
    }

    if(req.body.senha.length < 4){
        erros.push({texto: "senha curta demais"})
    }

    if(req.body.senha != req.body.senha2){
        erros.push({texto: "as senhas não conferem"})
    }

    if(erros.length > 0){
        res.render('usuarios/registro', {erros: erros})
    }else{

        Usuario.findOne({email: req.body.email}).then((usuario)=>{
            if(usuario){
                req.flash("error_msg", "email ja cadastrado")
                res.redirect('usuarios/registro')
            }else{
                const novoUsuario = new Usuario({
                    nome: req.body.nome,
                    email: re.body.email,
                    senha: req.body.senha
                })

                bcrypt.genSalt(10, (erro, salt)=>{
                    bcrypt.hash(novoUsuario.senha, salt, (erro, hash)=>{
                        if(erro){
                            req.flash("error_msg", "houve erro no hashing")
                            res.redirect('/')
                        }

                        novoUsuario.senha = hash

                        novoUsuario.save().then().catch((erro)=>{
                            req.flash("error_msg", )
                        })
                    })
                })
            }
        })

    }
});

router.get('/login', (req, res)=>{
   res.render('usarios/login') 
})

module.exports =  router;