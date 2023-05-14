"use strict";

import express = require('express');
import bodyParser = require('body-parser');
import mongoose = require('./db');

const app = express();
const port = process.env.PORT || 8080;

app
    .use(bodyParser.json())
    .use((_req: Request | any, res: Response | any, next: Function) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        next();
    })
    .use('/', require('./routes'));

if (mongoose.initDb()) {
    app.listen(port);
    console.log(`Listening on port ${port}`);
}