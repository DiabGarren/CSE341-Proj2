"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swaggerAuto = require("swagger-autogen");
const swaggerAutogen = swaggerAuto();
const doc = {
    info: {
        title: 'My API',
        description: 'Vehicles API',
    },
    // host: 'cse341-proj2.onrender.com',
    // schemes: ['https'],
    host: 'localhost:8080',
    schemes: ['http'],
};
const outputFile = 'dist/swagger.json';
const endpointsFiles = ['dist/routes/index.js'];
// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
