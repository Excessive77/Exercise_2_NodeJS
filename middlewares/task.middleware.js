//Models
const { Task } = require('../models/task.model');

//Utils
const { AppError } = require('../utils/appError.utils');
const { catchAsync } = require('../utils/catchAsync.utils');

const tasksExists = catchAsync(async (req, res, next) => {
    const { status } = req.params;

    const tasks = await Task.findAll({ where: { status } });

    if (!tasks) {
        return next(new AppError('Tasks not found'));
    }

    req.tasks = tasks;
    next();
});

const taskExists = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const task = await Task.findOne({ where: { id } });

    if (!task) {
        return next(new AppError('Task not found', 404));
    }

    req.task = task;
    next();
});

module.exports = { tasksExists, taskExists };
