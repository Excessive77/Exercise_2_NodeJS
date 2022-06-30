const express = require('express');

//Routes
const { usersRouter } = require('./routes/users.routes');
const { tasksRouter } = require('./routes/tasks.routes');

//Global err controller
const { globalErrorHandler } = require('./controllers/error.controller');

//utils
const { AppError } = require('./utils/appError.utils');

const app = express();
app.use(express.json());

//Define endpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/tasks', tasksRouter);

//Handle incoming unknown routes to the server
app.all('*', (req, res, next) => {
    next(
        new AppError(
            `${req.method} ${req.originalUrl} not found on this server`,
            404
        )
    );
});

app.use(globalErrorHandler);

module.exports = { app };
