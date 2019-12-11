const Sequelize = require('sequelize');
const sequelize = new Sequelize('testserver', 'postgres', 'Onetwo34', {
    dialect: 'postgres',
    host: 'localhost'
})

sequelize.authenticate()
    .then(() => console.log('Postgres DB is Connected'))
    .catch(err => console.log(err))

module.exports = sequelize;