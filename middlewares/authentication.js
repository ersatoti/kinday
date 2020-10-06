const jwt = require('jsonwebtoken');
const variables = require('../bin/configuration/variables');
const i18n = require('../locales/pt.js');

module.exports = async(req, res, next) =>{
    
    let token = req.body.token || req.query.query || req.headers['x-access-token'];

    if(token){
        try {
            let decoded = await jwt.verify(token, variables.Security.secretKey);
            req.usuarioLogado = decoded;
            //console.log('Usuario sessao', req.usuarioLogado.user._id)
            next();

        } catch (error) {
            res.status(401).send({message: i18n.JWT_TOKEN_INVALID});
            return;
        }
    }else{
        res.status(401).send({message: i18n.JWT_TOKEN_REQ});
        return;
    }
}