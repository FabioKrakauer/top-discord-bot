const { DataTypes } = require('sequelize');
require('dotenv').config();

module.exports = (sequelize) => {
    const Aircraft = sequelize.define('airports', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        icao: {
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING,
        },
        country: {
            type: DataTypes.STRING,
        },
        lat: {
            type: DataTypes.FLOAT,
        },
        lng: {
            type: DataTypes.FLOAT,
        },
        hub: {
            type: DataTypes.INTEGER,
        },
        fuelprice: {
            type: DataTypes.INTEGER,
        },
        chartlink: {
            type: DataTypes.INTEGER
        }
    }, {
        tableName: process.env.TABLE_PREFIX+'airports',
        freezeTableName: true,
        timestamps: false
    });
    return Aircraft;
};