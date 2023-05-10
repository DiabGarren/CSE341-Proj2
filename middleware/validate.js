/* eslint-disable no-undef */
const validator = require('../helpers/validate');

const saveVehicle = (req, res, next) => {
    const validationRule = {
        make: 'required|string',
        model: 'required|string',
        description: 'required|string',
        price: 'required|integer',
        classification: 'required|string',
        images: {
            large: 'string',
            small: 'string'
        }
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

const saveUser = (req, res, next) => {
    const validationRule = {
        username: 'required|string',
        email: 'required|email',
        password: ['required', 'regex:^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$'],
        image: 'string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            if (err.errors.password) {
                err.errors.password.push('The password must be: minimum 8 characters, contain at least 1 upper case, 1 lower case and 1 number.');
            }
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

module.exports = { saveVehicle, saveUser };