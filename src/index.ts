"use strict";

import express = require('express');
import bodyParser = require('body-parser');
import mongodb = require('./db');

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

mongodb.initDb((err: Error | any) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});