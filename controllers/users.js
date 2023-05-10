/* eslint-disable no-undef */
const mongodb = require('../db');
const objectId = require('mongodb').ObjectId;
const bcrypt = require('bcrypt');

const getUsers = async (req, res) => {
    /*
        #swagger.tags = ['Users']
        #swagger.description = 'Get ALL users
        All passwords are hashed.'
    */
    try {
        const result = await mongodb.getDb().db().collection('users').find();
        result.toArray().then((list) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(list);
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

const getUser = async (req, res) => {
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
        const result = await mongodb.getDb().db().collection('users').find({ _id: id });
        result.toArray()
            .then((list) => {
                if (list.length == 0) {
                    res.status(400).send({ message: 'Cannot find user with id: ' + id });
                } else {
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
    } catch (err) {
        res.status(500).json(err);
    }
};

const createUser = async (req, res) => {
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
            password: await hashPassword(req.body.password),
            image: req.body.image
        };
        const response = await mongodb.getDb().db().collection('users').insertOne(vehicle);
        if (response.acknowledged || password != null) {
            res.status(201).json(response);
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the user.');
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const updateUser = async (req, res) => {
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
            password: await hashPassword(req.body.password),
            image: req.body.image
        };

        const result = await mongodb.getDb().db().collection('users').find({ _id: id });
        const hash = await result.toArray();

        const samePass = await comparePassword(req.body.password, hash[0].password);
        console.log(samePass);

        if (samePass == true) {
            res.status(400).json('The new password cannot be the same as the old password.');
        } else {
            const response = await mongodb.getDb().db().collection('users').replaceOne({ _id: id }, vehicle);
            if (response.acknowledged) {
                res.status(204).send();
            } else {
                res.status(500).json(response.error || 'Some error occurred while updating the user.');
            }
        }
        
    } catch (err) {
        res.status(500).json(err);
    }
};

const deleteUser = async (req, res) => {
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
        const response = await mongodb.getDb().db().collection('users').deleteOne({ _id: id });
        if (response.deletedCount > 0) {
            res.status(200).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the user.');
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const hashPassword = async (password) => {
    const hash = await bcrypt.hash(password, 10);
    return hash;
};

const comparePassword = async (password, hash) => {
    const result = await bcrypt.compare(password, hash);
    return result;
};
module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };