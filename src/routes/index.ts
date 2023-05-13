"use strict";

import express = require('express');
const routes = express.Router();

routes.use('/vehicles', require('./vehicles'));
routes.use('/users', require('./users'));
routes.use('/', require('./swagger'));

export = routes;
