'use strict'
const repository = require('../repositories/userReposiroty');
const validation = require('../bin/helpers/validation');
const ctrlBase = require('../bin/base/controllerBase')
const _repo = new repository();
const i18n = require('../locales/pt.js');

//Token
const variables = require('../bin/configuration/variables');
const md5 = require('md5');
const jwt = require('jsonwebtoken');

function userController() {

}

userController.prototype.get = async (req, res) => {
    console.log(i18n.HELLO);
    ctrlBase.get(_repo, req, res);
};

userController.prototype.getById = async (req, res) => {
    ctrlBase.getById(_repo, req, res);
};

userController.prototype.post = async (req, res) => {

    let _validationContract = new validation();

    _validationContract.isRequired(req.body.nome, i18n.USER_NOME_REQ);
    _validationContract.isRequired(req.body.email, i18n.USER_EMAIL_REQ);
    _validationContract.isEmail(req.body.email, i18n.USER_EMAIL_INVALID);
    _validationContract.isRequired(req.body.password, i18n.USER_SENHA_REQ);
    _validationContract.isRequired(req.body.passwordConfirmation, i18n.USER_SENHA_CONF_REQ);
    _validationContract.isTrue(req.body.password != req.body.passwordConfirmation, i18n.USER_SENHA_DIFF_REQ);

    let userisEmailExist = await _repo.isEmailExist(req.body.email);

    if (userisEmailExist) {
        _validationContract.isTrue((userisEmailExist.nome != undefined), i18n.USER_EMAIL_CAD);
    }

    //Criptograda password
    req.body.password = md5(req.body.password);

    ctrlBase.post(_repo, _validationContract, req, res);

};

userController.prototype.put = async (req, res) => {

    let _validationContract = new validation();

    _validationContract.isRequired(req.body.nome, i18n.USER_NOME_REQ);
    _validationContract.isRequired(req.body.email, i18n.USER_EMAIL_REQ);
    _validationContract.isEmail(req.body.email, i18n.USER_EMAIL_INVALID);
    _validationContract.isRequired(req.params.id, i18n.USER_ID_EDIT);

    let userisEmailExist = await _repo.isEmailExist(req.body.email);

    if (userisEmailExist) {
        _validationContract.isTrue((userisEmailExist.nome != undefined
            && userisEmailExist._id !== req.params.id), i18n.USER_EMAIL_CAD);
    }

    ctrlBase.put(_repo, _validationContract, req, res);
};

userController.prototype.delete = async (req, res) => {
    ctrlBase.delete(_repo, req, res);
};

userController.prototype.authentication = async (req, res) => {

    let _validationContract = new validation();
    _validationContract.isRequired(req.body.email, i18n.USER_EMAIL_REQ);
    _validationContract.isEmail(req.body.email, i18n.USER_EMAIL_INVALID);
    _validationContract.isRequired(req.body.password, i18n.USER_SENHA_REQ);

    if(!_validationContract.isValid()){
        res.status(400).send({message: i18n.USER_LOGIN_FAILED,
         validation: _validationContract.errors()});
        return;
    }

    let result = await _repo.authenticate(req.body.email, req.body.password);
    if(result){
        res.status(200).send({
            user: result,
            token: jwt.sign({user : result}, variables.Security.secretKey)
        })
    }else{
        res.status(404).send({message: i18n.USER_NOT_FOUND});
        return;
    }
};



module.exports = userController;