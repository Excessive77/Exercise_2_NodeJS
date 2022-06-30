//Models
const { User } = require('../models/user.model');
const { Task } = require('../models/task.model');

//Utils
const { catchAsync } = require('../utils/catchAsync.utils');

const getAllTasks = catchAsync(async (req, res, next) => {
    const tasks = await Task.findAll({
        include: User,
    });

    res.status(200).json({
        status: 'success',
        tasks,
    });
});

const createTask = catchAsync(async (req, res, next) => {
    const { title, userId, limitDate } = req.body;

    const newTask = await Task.create({
        title,
        userId,
        startDate: new Date(),
        limitDate,
    });

    res.status(201).json({
        status: 'success',
        newTask,
    });
});

const getTaskById = catchAsync(async (req, res, next) => {
    const { task } = req;

    res.status(200).json({
        status: 'success',
        task,
    });
});

const getTaskByStatus = catchAsync(async (req, res, next) => {
    const { tasks } = req;

    res.status(200).json({
        status: 'success',
        tasks,
    });
});

const updateTask = catchAsync(async (req, res, next) => {
    const { task } = req;

    const finishDated = new Date();
    const limitDated = task.limitDate;

    if (finishDated.getTime() - limitDated.getTime() < 0) {
        await task.update({
            finishDate: finishDated,
            status: 'completed',
        });
    } else {
        await task.update({
            finishDate: finishDated,
            status: 'late',
        });
    }

    res.status(201).json({
        status: 'success',
        task,
    });
});

const deleteTask = catchAsync(async (req, res, next) => {
    const { task } = req;

    await task.update({ status: 'deleted' });

    res.status(204).json({ status: 'success' });
});

module.exports = {
    getTaskByStatus,
    createTask,
    updateTask,
    deleteTask,
    getAllTasks,
    getTaskById,
};
