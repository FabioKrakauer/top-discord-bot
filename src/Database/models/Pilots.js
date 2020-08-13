const { DataTypes } = require('sequelize');
require('dotenv').config();

module.exports = (sequelize) => {
    const Pilots = sequelize.define('pilots', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            field: 'pilotid'
        },
        firstname: {
            type: DataTypes.STRING,
        },
        lastname: {
            type: DataTypes.STRING,
        },
        money: {
            type: DataTypes.DOUBLE,
            field: 'totalpay'
        },
        retired: {
            type: DataTypes.INTEGER
        },
        rank: {
            type: DataTypes.STRING
        },
        totalhours: {
            type: DataTypes.DOUBLE
        }
    }, {
        tableName: process.env.TABLE_PREFIX+'pilots',
        freezeTableName: true,
        timestamps: false
    });
    return Pilots;
};