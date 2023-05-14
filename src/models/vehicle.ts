"use strict";

import mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
    make: String,
    model: String,
    description: String,
    price: Number,
    classification: String,
    images: {
        large: String,
        small: String
    }
});

export = mongoose.model("Vehicle", vehicleSchema);