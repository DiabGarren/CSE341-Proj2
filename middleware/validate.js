/* eslint-disable no-undef */
const validator = require('../helpers/validate');

const saveVehicle = (req, res, next) => {
    const validationRule = {
        make: 'required|string',
        model: 'required|string',
        description: 'required|string',
        price: 'required|integer',
        classificationId: 'required|integer',
        large: 'string',
        small: 'string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = { saveVehicle };