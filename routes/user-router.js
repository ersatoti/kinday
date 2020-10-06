'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const auth = require('../middlewares/authentication');

let _ctrl = new controller();

//Route public access
router.post('/authentication', _ctrl.authentication)
router.post('/register', _ctrl.post)

//Require token auth
router.get('/', auth, _ctrl.get);
router.get('/:id', auth, _ctrl.getById);
router.post('/', auth, _ctrl.post);
router.put('/:id', auth, _ctrl.put);
router.delete('/:id', auth, _ctrl.delete);

module.exports = router;