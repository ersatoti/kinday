'use strict'

const repository = require('../repositories/produtoReposiroty');
const validation = require('../bin/helpers/validation');
const ctrlBase = require('../bin/base/controllerBase')
const _repo = new repository();
const i18n = require('../locales/pt.js');

function produtoController() {

}

produtoController.prototype.get = async (req, res) => {
    ctrlBase.get(_repo, req, res);
};

produtoController.prototype.getById = async (req, res) => {
    ctrlBase.getById(_repo, req, res);

};

produtoController.prototype.post = async (req, res) => {

    let _validationContract = new validation();
    _validationContract.isRequired(req.body.nome, i18n.PROD_NOME_REQ);
    _validationContract.isRequired(req.body.descricao, i18n.PROD_DESCRICAO_REQ);
    _validationContract.isRequired(req.body.foto, i18n.PROD_FOTO_REQ);
    _validationContract.isRequired(req.body.preco, i18n.PROD_PRECO_REQ);

    if(req.body.preco){
        _validationContract.isTrue(req.body.preco == 0, i18n.PROD_PRECO_MAIOR_ZERO);
    }

    ctrlBase.post(_repo, _validationContract, req, res);
};

produtoController.prototype.put = async (req, res) => {
    let _validationContract = new validation();

    _validationContract.isRequired(req.body.nome, i18n.PROD_NOME_REQ);
    _validationContract.isRequired(req.body.descricao, i18n.PROD_DESCRICAO_REQ);
    _validationContract.isRequired(req.body.foto, i18n.PROD_FOTO_REQ);
    _validationContract.isRequired(req.body.preco, i18n.PROD_PRECO_REQ);
    _validationContract.isRequired(req.params.id, i18n.ID_REQ);

    if(req.body.preco){
        _validationContract.isTrue(req.body.preco == 0, i18n.PROD_PRECO_MAIOR_ZERO);
    }

    ctrlBase.put(_repo, _validationContract, req, res);
};

produtoController.prototype.delete = async (req, res) => {
    ctrlBase.delete(_repo, req, res);

};


module.exports = produtoController;