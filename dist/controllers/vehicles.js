"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/* eslint-disable no-undef */
const db = require("../db");
const mongodb = require("mongodb");
const objectId = mongodb.ObjectId;
const getVehicles = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*
        #swagger.tags = ['Vehicles']
        #swagger.description = 'Get ALL vehicles'
    */
    try {
        const result = db.getDb().db().collection('vehicles').find();
        result.toArray().then((list) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(list);
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});
const getVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            .then((list) => {
            if (list.length == 0) {
                res.status(400).send({ message: 'Cannot find vehicle with id: ' + id });
            }
            else {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(list[0]);
            }
        })
            .catch((err) => {
            res.status(500).send({
                message: 'Error finding vehicle with id=' + id,
                error: err
            });
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});
const createVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const response = yield db.getDb().db().collection('vehicles').insertOne(vehicle);
        if (response.acknowledged) {
            res.status(201).json(response);
        }
        else {
            res.status(500).json('Some error occurred while creating the vehicle.');
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});
const updateVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const response = yield db.getDb().db().collection('vehicles').replaceOne({ _id: id }, vehicle);
        if (response.acknowledged) {
            res.status(204).send();
        }
        else {
            res.status(500).json('Some error occurred while updating the vehicle.');
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});
const deleteVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*
        #swagger.tags = ['Vehicles']
        #swagger.description = 'Delete a vehicle by ID'
    */
    try {
        if (!objectId.isValid(req.params.id)) {
            res.status(400).json('A valid vehicle id is required to delete a vehicle.');
        }
        const id = new objectId(req.params.id);
        const response = yield db.getDb().db().collection('vehicles').deleteOne({ _id: id });
        if (response.deletedCount > 0) {
            res.status(200).send();
        }
        else {
            res.status(500).json('Some error occurred while deleting the vehicle.');
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});
module.exports = { getVehicles, getVehicle, createVehicle, updateVehicle, deleteVehicle };
