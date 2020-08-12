const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql'
});

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
    tableName: 'phpvms_pilots',
    freezeTableName: true,
    timestamps: false
});
module.exports.test = async () => {
    try {
        await sequelize.authenticate();
        console.log('ta rodando isso como?');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}
module.exports.sequelize = sequelize;
module.exports.models = {
    Pilots
}