/* eslint-disable no-undef */
const routes = require('express').Router();
const myController = require('../controllers');

routes.get('/', myController.getVehicles);
routes.get('/:id', myController.getVehicle);

routes.post('/', myController.createVehicle);

routes.put('/:id', myController.updateVehicle);

routes.delete('/:id', myController.deleteVehicle);

module.exports = routes;