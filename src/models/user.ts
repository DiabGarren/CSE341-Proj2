"use strict";

import mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    image: String
});

export = mongoose.model("User", userSchema);