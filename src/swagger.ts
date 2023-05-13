"use strict";

import swaggerAutogen = require('swagger-autogen');

const doc = {
    info: {
        title: 'My API',
        description: 'Vehicles API',
    },
    host: 'cse341-proj2.onrender.com',
    schemes: ['https'],
    // host: 'localhost:8080',
    // schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['dist/routes/index.js'];

// generate swagger.json
swaggerAutogen()(outputFile, endpointsFiles, doc);

// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//     await import('./index.js');
// });
