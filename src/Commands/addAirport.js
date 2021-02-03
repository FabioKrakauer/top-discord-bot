
require('dotenv').config();

const utils = require('../utils');
const database = require("../Database");
const axios = require('axios').default;

module.exports = async (client, args, sender) => {
    if (!sender.member._roles.includes(process.env.ADMIN_ROLE_ID) && !sender.member._roles.includes(process.env.EVENTS_ROLE_ID)) {
        utils.error(sender.author, 'Sem permissão! Infelizmente você não possui permissão para isto!');
        return;
    }
    if (args.length < 3) {
        utils.error(sender.author, 'Comando inválido! Digite ' + process.env.COMMAND_PREFIX + ' addAirport {ICAO}');
        return;
    }
    if (!utils.isValidIcao(args[2])) {
        utils.error(sender.author, 'Digite um ICAO válido');
        return;
    }

    const Airport = database.models.Airport;
    const search = await Airport.findOne({
        where: {
            icao: args[2]
        }
    });

    if (search == null) {
        sender.author.send('Adicionando aeroporto ' + args[2] + "...");
        try {
            const instance = axios.create({
                baseURL: 'https://avwx.rest/api/station/' + args[2],
                timeout: 3000,
                headers: { 'Authorization': 'Bearer ' + process.env.AVWX_API_KEY },
                method: 'get'
            });
            const response = await (await instance.get()).data;
            const airport = {
                icao: response.icao,
                name: response.name,
                country: response.country,
                lat: response.latitude,
                lng: response.longitude,
                hub: 0,
                fuelprice: 0,
                chartlink: 0
            }
            await Airport.create(airport);
            sender.author.send("Aeroporto " + airport.name + " criado com sucesso!");
        } catch (error) {
            sender.author.send('ERRO AO CRIAR AEROPORTO! ' + error);
        }
    } else {
        sender.author.send('Este aeroporto já está adicionado!');
    }

}