"use strict";

const routes = require('express').Router();

import { graphqlHTTP } from 'express-graphql';
import schema = require('../controllers/vehicles');


routes.use('/', graphqlHTTP({ schema, graphiql: true }));

export = routes;
