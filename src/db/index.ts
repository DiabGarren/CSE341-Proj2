"use strict";

import dotenv = require('dotenv');
dotenv.config();
import mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db: mongodb.MongoClient;

const initDb = (callback: Function) => {
    if (_db) {
        console.log('Db is already initialized!');
        return callback(null, _db);
    }
    MongoClient.connect(process.env.MONGODB_URI)
        .then((client) => {
            _db = client;
            callback(null, _db);
        })
        .catch((err) => {
            callback(err);
        });
};

const getDb = () => {
    if (!_db) {
        throw Error('Db not initialized');
    }
    return _db;
};

export = { initDb, getDb, };