const { DataTypes } = require('sequelize');
require('dotenv').config();

module.exports = (sequelize) => {
    const EventsJump = sequelize.define('events', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        airport: {
            type: DataTypes.STRING,
        },
        startAt: {
            type: DataTypes.DATE,
        },
        endAt: {
            type: DataTypes.DATE
        },
        createdBy:{
            type: DataTypes.INTEGER
        }
    }, {
        tableName: process.env.TABLE_PREFIX+'eventsjump',
        freezeTableName: true,
        timestamps: true
    });
    return EventsJump;
};