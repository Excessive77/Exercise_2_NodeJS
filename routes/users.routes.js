const express = require('express');

//Controllers
const {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
} = require('../controllers/users.controller');

//Middlewares
const {
    createUserValidator,
} = require('../middlewares/userValidator.middleware'); //
const { userExists } = require('../middlewares/users.middleware');
// const { statusExists } = require('../middlewares/status.middleware');

const usersRouter = express.Router();

usersRouter.get('/', getAllUsers);

usersRouter.post('/', createUserValidator, createUser);

usersRouter.get('/:id', userExists, getUserById);

usersRouter.patch('/:id', userExists, updateUser);

usersRouter.delete('/:id', userExists, deleteUser);

// usersRouter.get('/:status', statusExists, getUserByStatus);

module.exports = { usersRouter };
