const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const variables = require('../bin/configuration/variables');

//routes
const catRouter = require('../routes/cat-router');
const produtoRouter = require('../routes/produto-router');
const userRouter = require('../routes/user-router');

//create api server web
const app = express();

//configuration parse json 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//configuration connection bd
mongoose.connect(variables.Database.connection, {useNewUrlParser: true});

//configure routes
app.use('/api/cat', catRouter);
app.use('/api/produto', produtoRouter);
app.use('/api/user', userRouter);


//export api
module.exports = app;