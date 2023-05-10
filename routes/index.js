/* eslint-disable no-undef */
const routes = require('express').Router();

routes.use('/vehicles', require('./vehicles'));
routes.use('/users', require('./users'));
routes.use('/', require('./swagger'));

module.exports = routes;
