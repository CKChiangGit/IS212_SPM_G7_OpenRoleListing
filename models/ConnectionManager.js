const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'mysql',
    username: 'root',
    password: '',
    database: 'printerdb',
    host: 'localhost',
    port: '3306',
});

// // Function to test Connection with Database
// async function testDatabaseConnection() {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// }

// testDatabaseConnection();

module.exports = sequelize;