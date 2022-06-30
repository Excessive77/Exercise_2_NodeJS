const { body, validationResult } = require('express-validator');

const { AppError } = require('../utils/appError.utils');

const checkResult = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        //Array has errors
        const errorMsgs = errors.array().map(err => err.msg);

        const message = errorMsgs.join('. ');

        return next(new AppError(message, 404));
    }

    next();
};

const createUserValidator = [
    body('name').notEmpty().withMessage('Name cannot be empty'),
    body('email')
        .notEmpty()
        .isEmail()
        .withMessage('Must be a valid email address'),
    body('password')
        .isLength({ min: 8, max: 12 })
        .withMessage('Password must be at least 8 characters long')
        .isAlphanumeric()
        .withMessage('Password must be alphanumeric characters'),
    checkResult,
];

module.exports = { createUserValidator };
