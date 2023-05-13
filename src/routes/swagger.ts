"use strict";

import express = require('express');
import swaggerUi = require('swagger-ui-express');
import swaggerDocument = require('../swagger.json');

const router = express.Router();
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

export = router;