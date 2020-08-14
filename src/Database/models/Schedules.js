const { DataTypes } = require('sequelize');
require('dotenv').config();

module.exports = (sequelize) => {
    const Schedules = sequelize.define('schedules', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        code: {
            type: DataTypes.STRING,
        },
        flightnum: {
            type: DataTypes.INTEGER,
        },
        depicao: {
            type: DataTypes.STRING,
        },
        arricao: {
            type: DataTypes.STRING,
        },
        airplane: {
            type: DataTypes.INTEGER,
            field: 'aircraft',
            references: {
                model: 'aircrafts',
            },
        },
        distance: {
            type: DataTypes.INTEGER
        },
        enabled: {
            type: DataTypes.INTEGER
        }
    }, {
        tableName: process.env.TABLE_PREFIX+'schedules',
        freezeTableName: true,
        timestamps: false
    });
    return Schedules;
};