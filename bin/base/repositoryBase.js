'use strict'

const mongoose = require('mongoose');

class repositoryBase {

    constructor(model) {
        this._model = mongoose.model(model);
    }

    async create(data) {
        try {
            let model = new this._model(data);
            let result = await model.save();
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, data) {
        await this._model.findByIdAndUpdate(id, { $set: data });
        let result = await this._model.findById(id);
        return result;
    }

    async getAll() {
        return await this._model.find();
    }

    async getById(id) {
        return await this._model.findById(id);
    }

    async delete(id) {
        return await this._model.findByIdAndDelete(id);
    }

}

module.exports = repositoryBase;
    ;