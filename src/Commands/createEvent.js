const Discord = require('discord.js');
require('dotenv').config();

const utils = require('../utils');
const database = require("../Database");

module.exports = async (client, args, sender) => {
    if(!sender.member._roles.includes(process.env.ADMIN_ROLE_ID) && !sender.member._roles.includes(process.env.EVENTS_ROLE_ID)){
        utils.error(sender.author, 'Sem permissão! Infelizmente você não possui permissão para isto!');
        return;
    }
    if(args.length < 5) {
        utils.error(sender.author, 'Comando inválido! Digite ' + process.env.COMMAND_PREFIX +' addevento {ICAO} {data de inicio} {data final}');
        return;
    }
    if(!utils.isValidIcao(args[2])){
        utils.error(sender.author, 'Digite um ICAO válido');
        return;
    }
    if(!utils.isValidDate(args[3])) {
        console.log(args[3] + utils.isValidDate(args[3]))
        utils.error(sender.author, 'Digite uma data válida aaaa-mm-dd');
        return;
    }
    if(!utils.isValidDate(args[4])) {
        console.log(args[4] + utils.isValidDate(args[4]))
        utils.error(sender.author, 'Digite uma data válida aaaa-mm-dd');
        return;
    }
    const staff = utils.getPilotId(sender.member.nickname);
    if(staff.isValid == false) {
        utils.error(sender.author, staff.error);
        return;
    }
    args[3] += ' 03:00:00';
    args[4] += ' 02:59:59';
    const newEvent = {
        airport: args[2].toUpperCase(),
        startAt: args[3],
        endAt: args[4],
        createdBy: staff.databaseId
    };
    const EventsJump = database.models.EventsJump;
    const event = await EventsJump.create(newEvent);
    
    const startAt = new Date(event.dataValues.startAt);
    const endAt = new Date(event.dataValues.endAt);

    const eventAnnouncement = new Discord.MessageEmbed()
    .setColor('#FF5100')
    .setTitle('NOVO EVENTO CRIADO')
    .setDescription('Novo evento liberado na TOP Airlines')
    .setThumbnail(client.user.displayAvatarURL())
    .addFields(
        { name: 'Aeroporto', value: event.dataValues.airport },
        { name: 'Liberado dia: ', value: utils.formatDate(startAt), inline: true},
        { name: 'Encerra dia: ', value: utils.formatDate(endAt), inline: true}
    )
    .setTimestamp()
    .setFooter('Copyright TOP Linhas Aéreas');
    client.channels.fetch('776961832429813783').then(channel => {
        channel.send(eventAnnouncement)
    });
    client.channels.fetch('776961832429813783').then(channel => {
        channel.send("@everyone Novo evento liberado! Use o comando " + process.env.COMMAND_PREFIX + " jump" + " " + event.dataValues.airport + " em #comandos-bot");
    });
    utils.log(client, "O usuario " + sender.member.user.username + "#"+sender.member.user.discriminator + " adicionou um novo evento em " + args[2].toUpperCase());
}