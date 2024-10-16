import { Schema as _Schema, model } from 'mongoose';
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