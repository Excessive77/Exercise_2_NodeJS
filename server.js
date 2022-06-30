const { app } = require('./app');

//utils (database)
const { db } = require('./utils/database.utils');

const { User } = require('./models/user.model');
const { Task } = require('./models/task.model');

db.authenticate()
    .then(() => console.log('DB authenticated'))
    .catch(() => console.log('DB not authenticated'));

//Establish model's relations
User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User);

db.sync()
    .then(() => console.log('DB sync'))
    .catch(() => console.log('DB sync error'));

app.listen(4000, () => {
    console.log('Is alive!!!!');
});
