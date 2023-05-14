"use strict";

const routes = require('express').Router();
const myController = require('../controllers/users');
const validation = require('../middleware/validate');

routes.get('/', myController.getUsers);
routes.get('/:id', myController.getUser);

routes.post('/', validation.saveUser, myController.createUser);

routes.put('/:id', validation.saveUser, myController.updateUser);

routes.delete('/:id', myController.deleteUser);

export = routes;