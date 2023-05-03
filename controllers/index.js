/* eslint-disable no-undef */
const mongodb = require('../db');
const objectId = require('mongodb').ObjectId;

const getVehicles = async (req, res) => {
    /*
        #swagger.tags = ['Vehicles']
        #swagger.description = 'Get ALL vehicles'
    */
    const result = await mongodb.getDb().db().collection('vehicles').find();
    result.toArray().then((list) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(list);
    });
};

const getVehicle = async (req, res) => {
    /*
        #swagger.tags = ['Vehicles']
        #swagger.description = 'Get vehicle by ID'
    */
    const id = new objectId(req.params.id);
    const result = await mongodb.getDb().db().collection('vehicles').find({ _id: id });
    result.toArray().then((list) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(list[0]);
    });
};

const createVehicle = async (req, res) => {
    /*
        #swagger.tags = ['Vehicles']
        #swagger.description = 'Add a NEW vehicle'
    */
    const vehicle = {
        make: req.body.make,
        model: req.body.model,
        description: req.body.description,
        price: req.body.price,
        classificationId: req.body.classificationId,
        images: {
            large: req.body.large,
            small: req.body.small
        }
    };
    const response = await mongodb.getDb().db().collection('vehicles').insertOne(vehicle);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the vehicle.');
    }
};

const updateVehicle = async (req, res) => {
    /*
        #swagger.tags = ['Vehicles']
        #swagger.description = 'Update a vehicle by ID'
    */
    const id = new objectId(req.params.id);
    const vehicle = {
        make: req.body.make,
        model: req.body.model,
        description: req.body.description,
        price: req.body.price,
        classificationId: req.body.classificationId,
        images: {
            large: req.body.large,
            small: req.body.small
        }
    };
    const response = await mongodb.getDb().db().collection('vehicles').replaceOne({ _id: id }, vehicle);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the vehicle.');
    }
};

const deleteVehicle = async (req, res) => {
    /*
        #swagger.tags = ['Vehicles']
        #swagger.description = 'Delete a vehicle by ID'
    */
    const id = new objectId(req.params.id);
    const response = await mongodb.getDb().db().collection('vehicles').deleteOne({ _id: id });
    if (response.deletedCount > 0) {
        res.status(200).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the vehicle.');
    }
};
module.exports = { getVehicles, getVehicle, createVehicle, updateVehicle, deleteVehicle };