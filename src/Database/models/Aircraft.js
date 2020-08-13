const { DataTypes } = require('sequelize');
require('dotenv').config();

module.exports = (sequelize) => {
    const Aircraft = sequelize.define('aircrafts', {
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
    }, {
        tableName: process.env.TABLE_PREFIX+'aircraft',
        freezeTableName: true,
        timestamps: false
    });
    return Aircraft;
};