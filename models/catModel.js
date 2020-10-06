'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const catModel = new schema({
    titulo: { trim: true, index: true, required: true, type: String },
    descricao: { type: String },
    ativa: { type: Boolean, required: true, default: true },
    foto: { type: String, required: true },
    dataCriacao: { type: Date, default: Date.now }
}, {
        versionKey: false
    });

catModel.pre('save', next => {
    if (!this.dataCriacao) {
        this.dataCriacao = new Date();
    }
    next();
});

module.exports = mongoose.model('Categoria', catModel);