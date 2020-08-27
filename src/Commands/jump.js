const Discord = require('discord.js');
require('dotenv').config();

const utils = require('../utils');
const database = require("../Database");
const { QueryTypes } = require('sequelize');

module.exports = async (client, args, sender) => {
    if(args.length < 3) {
        utils.error(sender.author, 'Comando inválido! Digite ' + process.env.COMMAND_PREFIX +' jump {ICAO}');
        return;
    }
    if(!utils.isValidIcao(args[2])){
        utils.error(sender.author, 'Digite um ICAO válido');
        return;
    }
    const pilot = utils.getPilotId(sender.member.nickname);
    if(pilot.isValid == false) {
        utils.error(sender.author, pilot.error);
        return;
    }
    const today = utils.getUTCTime();
    const query = "SELECT `airport` FROM `phpvms_eventsjump` WHERE `airport` = '"+args[2].toUpperCase() + "' AND `startAt` <= '"+today+"' AND `endAt` >= '"+today+"' LIMIT 1";
    const event = await database.sequelize.query(query, { type: QueryTypes.SELECT });

    if(event.length == 0) {
        utils.error(sender.author, "Não existe nenhum evento liberado hoje em " + args[2].toUpperCase());
        return;
    }
    
    const location = event[0].airport;
    const updateLocationQuery = "UPDATE `fltbook_location` SET `arricao` = '"+location+"' WHERE `fltbook_location`.`pilot_id` = '"+pilot.databaseId+"'";
    const addAdminLog = "INSERT INTO `phpvms_adminlog` (`id`, `pilotid`, `datestamp`, `message`) VALUES (NULL, '"+pilot.databaseId+"', '"+today+"', 'MASCOTOP: Pilto "+pilot.fullId+" Efetuou um jump gratuito para " + location + "')";
    try {
        await database.sequelize.query(updateLocationQuery);
        await database.sequelize.query(addAdminLog);
        sender.author.send('Você foi movido para o aeroporto ' + location + ' com succeso! Lembre-se de criar ou gerar charter!')
    } catch (error) {
        utils.error(sender.author, 'Erro interno no servidor! Codigo: ' + error);
    }
}