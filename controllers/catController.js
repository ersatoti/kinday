'use strict'

const repository = require('../repositories/catReposiroty');
const validation = require('../bin/helpers/validation');
const ctrlBase = require('../bin/base/controllerBase')
const _repo = new repository();
const i18n = require('../locales/pt.js');

function catController() {

}

catController.prototype.get = async (req, res) => {
    ctrlBase.get(_repo, req, res);
};

catController.prototype.getById = async (req, res) => {
    ctrlBase.getById(_repo, req, res);
};

catController.prototype.post = async (req, res) => {

    let _validationContract = new validation();
    _validationContract.isRequired(req.body.titulo, i18n.CAT_TITULO_REQ);
    _validationContract.isRequired(req.body.foto, i18n.CAT_FOTO_REQ);

    ctrlBase.post(_repo, _validationContract, req, res);
};

catController.prototype.put = async (req, res) => {
    let _validationContract = new validation();
    _validationContract.isRequired(req.body.titulo, i18n.CAT_TITULO_REQ);
    _validationContract.isRequired(req.body.foto, i18n.CAT_FOTO_REQ);
    _validationContract.isRequired(req.params.id, i18n.ID_REQ);

    ctrlBase.put(_repo, _validationContract, req, res);
};

catController.prototype.delete = async (req, res) => {
    ctrlBase.delete(_repo, req, res);
};


module.exports = catController;