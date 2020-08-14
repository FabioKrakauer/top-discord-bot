const utils = require('../utils');

const database = require('../Database');

require('dotenv').config();
module.exports = async (client, args, sender) => {

    if(args.length < 4) {
        utils.error(sender.author, 'Digite /top rotas {icao de saída} {icao de chegada}');
        return;
    }
    if(!utils.isValidIcao(args[2])){
        utils.error(sender.author, 'Seu icao de saída esta inválido');
        return;
    }
    if(!utils.isValidIcao(args[3])){
        utils.error(sender.author, 'Seu icao de chegada esta inválido');
        return;
    }
    let message = "**Rotas entre "+args[2].toUpperCase()+" e "+args[3].toUpperCase()+"** \nNUMERO DO VOO - SAIDA - CHEGADA - DISTANCIA - AERONAVE\n`";
    const Schedules = database.models.Schedules;
    const Aircraft = database.models.Aircraft;

    const routes = await Schedules.findAll({
        where: {
            depicao: args[2],
            arricao: args[3],
            enabled: 1
        },
        include: {
            model: Aircraft,
            as: 'plane'
        }
    });
    if(routes.length == 0) {
        sender.author.send('Não existe nenhuma rota criada ou ativa entre '+args[2].toUpperCase()+" e "+args[3].toUpperCase());
        return;
    }
    routes.forEach(route => {
        message += `${route.dataValues.code}${route.dataValues.flightnum} - ${route.dataValues.depicao} - ${route.dataValues.arricao} - ${route.dataValues.distance}mn - ${route.dataValues.plane.dataValues.name}\n`;
    })
    message += "`";
    sender.author.send(message);
}

