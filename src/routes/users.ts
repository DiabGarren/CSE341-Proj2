"use strict";

import myController = require('../controllers/users');
import validation = require('../middleware/validate');

import express = require('express');
const routes = express.Router();

routes.get('/', myController.getUsers);
routes.get('/:id', myController.getUser);

routes.post('/', validation.saveUser, myController.createUser);

routes.put('/:id', validation.saveUser, myController.updateUser);

routes.delete('/:id', myController.deleteUser);

export = routes;