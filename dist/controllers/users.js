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
const db = require("../db");
const bcrypt = require("bcrypt");
const mongodb = require("mongodb");
const objectId = mongodb.ObjectId;
const getUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*
        #swagger.tags = ['Users']
        #swagger.description = 'Get ALL users
        All passwords are hashed.'
    */
    try {
        const result = db.getDb().db().collection('users').find();
        result.toArray().then((list) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(list);
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*
        #swagger.tags = ['Users']
        #swagger.description = 'Get user by ID.
        All passwords are hashed.'
    */
    try {
        if (!objectId.isValid(req.params.id)) {
            res.status(400).json('A valid user id is required to find a user.');
        }
        const id = new objectId(req.params.id);
        const result = db.getDb().db().collection('users').find({ _id: id });
        result.toArray()
            .then((list) => {
            if (list.length == 0) {
                res.status(400).send({ message: 'Cannot find user with id: ' + id });
            }
            else {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(list[0]);
            }
        })
            .catch((err) => {
            res.status(500).send({
                message: 'Error finding user with id=' + id,
                error: err
            });
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*
        #swagger.tags = ['Users']
        #swagger.description = 'Add a NEW user.
        The password must be: minimum 8 characters, contain at least 1 upper case, 1 lower case and 1 number.
        All passwords are hashed.'
    */
    try {
        const vehicle = {
            username: req.body.username,
            email: req.body.email,
            password: yield hashPassword(req.body.password),
            image: req.body.image
        };
        const response = yield db.getDb().db().collection('users').insertOne(vehicle);
        if (response.acknowledged && vehicle.password != null) {
            res.status(201).json(response);
        }
        else {
            res.status(500).json('Some error occurred while creating the user.');
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*
        #swagger.tags = ['Users']
        #swagger.description = 'Update a user by ID.
        The new password cannot be same as the old password and must be: minimum 8 characters, contain at least 1 upper case, 1 lower case and 1 number.
        All passwords are hashed.'
    */
    try {
        if (!objectId.isValid(req.params.id)) {
            res.status(400).json('A valid user id is required to update a user.');
        }
        const id = new objectId(req.params.id);
        const vehicle = {
            username: req.body.username,
            email: req.body.email,
            password: yield hashPassword(req.body.password),
            image: req.body.image
        };
        const result = yield db.getDb().db().collection('users').find({ _id: id });
        const hash = yield result.toArray();
        const samePass = yield comparePassword(req.body.password, hash[0].password);
        console.log(samePass);
        if (samePass == true) {
            res.status(400).json('The new password cannot be the same as the old password.');
        }
        else {
            const response = yield db.getDb().db().collection('users').replaceOne({ _id: id }, vehicle);
            if (response.acknowledged) {
                res.status(204).send();
            }
            else {
                res.status(500).json('Some error occurred while updating the user.');
            }
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*
        #swagger.tags = ['Users']
        #swagger.description = 'Delete a user by ID.
        All passwords are hashed.'
    */
    try {
        if (!objectId.isValid(req.params.id)) {
            res.status(400).json('A valid user id is required to delete a user.');
        }
        const id = new objectId(req.params.id);
        const response = yield db.getDb().db().collection('users').deleteOne({ _id: id });
        if (response.deletedCount > 0) {
            res.status(200).send();
        }
        else {
            res.status(500).json('Some error occurred while deleting the user.');
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = yield bcrypt.hash(password, 10);
    return hash;
});
const comparePassword = (password, hash) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bcrypt.compare(password, hash);
    return result;
});
module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };
