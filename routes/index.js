/* eslint-disable no-undef */
const routes = require('express').Router();

routes.use('/vehicles', require('./vehicles'));
routes.use('/', require('./swagger'));

module.exports = routes;
