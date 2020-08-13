const utils = require('../utils');

const database = require('../Database');

require('dotenv').config();
module.exports = async (client, args, sender) => {
    let message = "**Próximos voos!** \nPILOTO - VOO - SAIDA - CHEGADA\n`";
    const Bids = database.models.Bids;
    const Schedules = database.models.Schedules;
    const Pilots = database.models.Pilots;

    const routes = await Bids.findAll({
        include: [
        {
            model: Schedules,
            as: 'rota'
        },
        {
            model: Pilots,
            as: 'pilot'
        }]
    });
    routes.forEach(route => {
        message += `${route.dataValues.pilot.firstname} ${route.dataValues.pilot.lastname} - ${route.dataValues.rota.code + route.dataValues.rota.flightnum} - ${route.dataValues.rota.depicao} - ${route.dataValues.rota.arricao}\n`;
    })
    message += "`";
    sender.author.send(message);
}

