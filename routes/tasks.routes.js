const express = require('express');

//controllers
const {
    getAllTasks,
    createTask,
    getTaskByStatus,
    getTaskById,
    updateTask,
    deleteTask,
} = require('../controllers/tasks.controller');

//Middlewares
const {
    createTaskValidator,
} = require('../middlewares/taskValidator.middleware');
const { tasksExists, taskExists } = require('../middlewares/task.middleware');

//Routers
const tasksRouter = express.Router();

tasksRouter.get('/', getAllTasks);

tasksRouter.post('/', createTaskValidator, createTask);

tasksRouter.get('/id', taskExists, getTaskById);

tasksRouter.get('/:status', tasksExists, getTaskByStatus);

tasksRouter.patch('/:id', taskExists, updateTask);

tasksRouter.delete('/:id', taskExists, deleteTask);

module.exports = { tasksRouter };
