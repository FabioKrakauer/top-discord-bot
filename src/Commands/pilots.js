const utils = require('../utils');

const database = require('../database');

require('dotenv').config();
module.exports = async (client, args, sender) => {
    let message = "Nossa Lista de pilotos TOP! \n";
    const Pilots = database.models.Pilots;
    const pilots = await Pilots.findAll({where: {
        retired: 0
    }});
    pilots.forEach(pilot => {
        message += `TOP${(pilot.id + 1000)} - ${pilot.firstname} ${pilot.lastname} - T$ ${pilot.money} - ${pilot.totalhours}h - ${pilot.rank}\n`;
    })
    sender.author.send(message);
}