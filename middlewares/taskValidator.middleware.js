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

const createTaskValidator = [
    body('title').notEmpty().withMessage('title cannot be empty'),
    body('userId').notEmpty().withMessage('must have a userId'),
    checkResult,
];

module.exports = { createTaskValidator };
