const { DataTypes } = require('sequelize');
require('dotenv').config();

module.exports = (sequelize) => {
    const Aircraft = sequelize.define('events', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        airportICAO: {
            type: DataTypes.STRING,
        },
        startAt: {
            type: DataTypes.DATE,
        },
        endAt: {
            type: DataTypes.DATE
        }
    }, {
        tableName: process.env.TABLE_PREFIX+'events',
        freezeTableName: true,
        timestamps: true
    });
    return Aircraft;
};