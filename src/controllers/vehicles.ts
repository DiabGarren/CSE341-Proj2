/* eslint-disable no-undef */
import db = require('../db');

import mongodb = require('mongodb');
const objectId = mongodb.ObjectId;

const getVehicles = async (_req: Request | any, res: Response | any) => {
    /*
        #swagger.tags = ['Vehicles']
        #swagger.description = 'Get ALL vehicles'
    */
    try {
        const result = db.getDb().db().collection('vehicles').find();
        result.toArray().then((list: Array<Object>) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(list);
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

const getVehicle = async (req: Request | any, res: Response | any) => {
    /*
        #swagger.tags = ['Vehicles']
        #swagger.description = 'Get vehicle by ID'
    */
    try {
        if (!objectId.isValid(req.params.id)) {
            res.status(400).json('A valid vehicle id is required to find a vehicle.');
        }
        const id = new objectId(req.params.id);
        const result = db.getDb().db().collection('vehicles').find({ _id: id });
        result.toArray()
            .then((list: Array<Object>) => {
                if (list.length == 0) {
                    res.status(400).send({ message: 'Cannot find vehicle with id: ' + id });
                } else {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).json(list[0]);
                }
            })
            .catch((err: Error | any) => {
                res.status(500).send({
                    message: 'Error finding vehicle with id=' + id,
                    error: err
                });
            });
    } catch (err) {
        res.status(500).json(err);
    }
};

const createVehicle = async (req: Request | any, res: Response | any) => {
    /*
        #swagger.tags = ['Vehicles']
        #swagger.description = 'Add a NEW vehicle'
    */
    try {
        const vehicle = {
            make: req.body.make,
            model: req.body.model,
            description: req.body.description,
            price: req.body.price,
            classification: req.body.classification,
            images: {
                large: req.body.large,
                small: req.body.small
            }
        };
        const response = await db.getDb().db().collection('vehicles').insertOne(vehicle);
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json('Some error occurred while creating the vehicle.');
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const updateVehicle = async (req: Request | any, res: Response | any) => {
    /*
        #swagger.tags = ['Vehicles']
        #swagger.description = 'Update a vehicle by ID'
    */
    try {
        if (!objectId.isValid(req.params.id)) {
            res.status(400).json('A valid vehicle id is required to update a vehicle.');
        }
        const id = new objectId(req.params.id);
        const vehicle = {
            make: req.body.make,
            model: req.body.model,
            description: req.body.description,
            price: req.body.price,
            classification: req.body.classification,
            images: {
                large: req.body.large,
                small: req.body.small
            }
        };
        const response = await db.getDb().db().collection('vehicles').replaceOne({ _id: id }, vehicle);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json('Some error occurred while updating the vehicle.');
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const deleteVehicle = async (req: any, res: any) => {
    /*
        #swagger.tags = ['Vehicles']
        #swagger.description = 'Delete a vehicle by ID'
    */
    try {
        if (!objectId.isValid(req.params.id)) {
            res.status(400).json('A valid vehicle id is required to delete a vehicle.');
        }
        const id = new objectId(req.params.id);
        const response = await db.getDb().db().collection('vehicles').deleteOne({ _id: id });
        if (response.deletedCount > 0) {
            res.status(200).send();
        } else {
            res.status(500).json('Some error occurred while deleting the vehicle.');
        }
    } catch (err) {
        res.status(500).json(err);
    }
};
export = { getVehicles, getVehicle, createVehicle, updateVehicle, deleteVehicle };