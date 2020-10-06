'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userModel = new schema({
    nome: { trim: true, index: true, required: true, type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    foto: { type: String, required: true },
    ativo: { type: Boolean, required: true, default: true },
    dataCriacao: { type: Date, default: Date.now }
}, {
        versionKey: false
    });

userModel.pre('save', next => {
    if (!this.dataCriacao) {
        this.dataCriacao = new Date();
    }
    next();
});

module.exports = mongoose.model('User', userModel);