"use strict";

import Validator = require('validatorjs');
const validator = (body: any, rules: Validator.Rules, customMessage: Validator.ErrorMessages, callback: Function) => {
    const validation = new Validator(body, rules, customMessage);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
};

export = validator;