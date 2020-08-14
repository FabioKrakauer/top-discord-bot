  
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql'
});

const Pilots = require('./models/Pilots')(sequelize);
const Aircraft = require('./models/Aircraft')(sequelize);
const Schedules = require('./models/Schedules')(sequelize);
const Bids = require('./models/Bids')(sequelize);

Aircraft.hasMany(Schedules,{
        foreignKey: 'id',
    });
Schedules.belongsTo(Aircraft,{
    foreignKey: 'aircraft',
    as: 'plane'
});

Pilots.hasOne(Bids, {foreignKey: 'pilotid'});
// Bids.belongsTo(Aircraft, {
//     foreignKey: 'aircraftid',
//     as: 'aeronave'
// });
Bids.belongsTo(Schedules, {
    foreignKey: 'routeid',
    as: 'rota'
});
Bids.belongsTo(Pilots, {
    foreignKey: 'pilotid',
    as: 'pilot'
});


module.exports.sequelize = sequelize;
module.exports.models = {
    Pilots,
    Schedules,
    Aircraft,
    Bids
}