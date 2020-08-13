const utils = require('../utils');

const database = require('../Database');

require('dotenv').config();
module.exports = async (client, args, sender) => {
    let message = "**Nossa Lista de pilotos TOP!** \nMATRICULA - NOME - DINHEIRO - HORAS - PATENTE\n`";
    const Pilots = database.models.Pilots;
    const pilots = await Pilots.findAll({where: {
        retired: 0
    }});
    pilots.forEach(pilot => {
        message += `TOP${(pilot.id + 1000)} - ${pilot.firstname} ${pilot.lastname} - T$ ${pilot.money} - ${pilot.totalhours}h - ${pilot.rank}\n`;
    })
    message += "`";
    sender.author.send(message);
}