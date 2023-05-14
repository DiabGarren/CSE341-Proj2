"use strict";

import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const initDb = () => {
    mongoose.connect(process.env.MONGODB_URI);

    mongoose.connection.once('open', () => {
        console.log('Connect to db');
    });
    return true;
};

export = { initDb };