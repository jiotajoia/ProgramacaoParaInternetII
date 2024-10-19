const { Schema: _Schema, model } = require('mongoose');
const Schema = _Schema;

const Usuario = new Schema({
    nome:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    senha:{
        type: String,
        required: true
    }
});

model("usuarios", Usuario);