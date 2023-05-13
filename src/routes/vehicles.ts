/* eslint-disable no-undef */
const routes = require('express').Router();
const myController = require('../controllers/vehicles');
const validation = require('../middleware/validate');

routes.get('/', myController.getVehicles);
routes.get('/:id', myController.getVehicle);

routes.post('/', validation.saveVehicle, myController.createVehicle);

routes.put('/:id', validation.saveVehicle, myController.updateVehicle);

routes.delete('/:id', myController.deleteVehicle);

module.exports = routes;