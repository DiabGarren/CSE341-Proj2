"use strict";

const routes = require('express').Router();

routes.use('/users', require('./users'));
routes.use('/vehicles', require('./vehicles'));

export = routes;
