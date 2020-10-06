require('../models/userModel');
const baseRepository = require('../bin/base/repositoryBase');
const md5 = require('md5');

class userRepository {

    constructor() {
        this._base = new baseRepository('User');
        this.projection = 'nome email _id';
    }

    async isEmailExist(email){
        return await this._base._model.findOne({email: email}, this.projection);
    }

    async authenticate(email, pass) {
        let _hashPass = md5(pass);
        return await this._base._model.findOne({ email: email, password: _hashPass }, this.projection);
    }

    async create(data) {
        let result = await this._base.create(data)
        return this._base._model.findById(result._id, this.projection);
    }

    async update(id, data) {

        let result = await this._base.update(id, {
            nome: data.nome,
            email: data.email,
            foto: data.foto
        });
        return this._base._model.findById(result._id, this.projection);
    }

    async getAll() {
        return await this._base._model.find({}, this.projection);
    }

    async getById(id) {
        return await this._base._model.findById(id, 'nome email _id foto');
    }

    async delete(id) {
        return await this._base.delete(id);
    }

}

module.exports = userRepository;