'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const produtoModel = new schema({
    nome: { trim: true, index: true, required: true, type: String },
    descricao: { type: String, required: true },
    preco: {type: Number, required: true, default: 0 },
    ativo: { type: Boolean, required: true, default: true },
    foto: { type: String, required: true },
    dataCriacao: { type: Date, default: Date.now }
}, {
        versionKey: false
    });

produtoModel.pre('save', next => {
    if (!this.dataCriacao) {
        this.dataCriacao = new Date();
    }
    next();
});

module.exports = mongoose.model('Produto', produtoModel);