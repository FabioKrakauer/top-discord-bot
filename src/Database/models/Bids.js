const { DataTypes } = require('sequelize');
require('dotenv').config();

module.exports = (sequelize) => {
    const Bids = sequelize.define('bids', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            field: 'bidid'
        },
        pilotid: {
            type: DataTypes.INTEGER,
            references: {
                model: 'pilots',
                key: 'pilotId'
            }
        },
        routeid: {
            type: DataTypes.INTEGER,
            references: {
                model: 'schedules',
                key: 'routeId'
            }
        },
        aircraftid: {
            type: DataTypes.INTEGER,
            references: {
                model: 'aircrafts',
                key: 'aircraftId'
            }
        },
    }, {
        tableName: process.env.TABLE_PREFIX+'bids',
        freezeTableName: true,
        timestamps: false
    });
    return Bids;
};