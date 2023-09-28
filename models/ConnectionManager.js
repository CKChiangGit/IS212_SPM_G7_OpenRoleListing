const { Sequelize } = require('sequelize');


const sequelize = new Sequelize({
    dialect: 'mysql',
    username: 'root',
    password: '',
    database: 'printerdb',
    host: 'localhost',
    port: '3306',
});

// Authenticate the Sequelize instance
sequelize.authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

// Sync Sequelize models with the database
sequelize.sync()
    .then(() => {
        console.log('Database and models synchronized.');
    })
    .catch((error) => {
        console.error('Error syncing database and models:', error);
    });

module.exports = sequelize;
