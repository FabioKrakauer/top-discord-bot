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
        aircraft: {
            type: DataTypes.INTEGER,
            field: 'aircraft',
            references: {
                model: 'aircraft',
            },
        }
    }, {
        tableName: process.env.TABLE_PREFIX+'schedules',
        freezeTableName: true,
        timestamps: false
    });
    return Schedules;
};