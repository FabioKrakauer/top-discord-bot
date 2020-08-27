const Discord = require('discord.js');
require('dotenv').config();

const utils = require('../utils');
const database = require("../Database");

module.exports = async (client, args, sender) => {
    if(args.length < 3) {
        utils.error(sender.author, 'Comando inválido! Digite ' + process.env.COMMAND_PREFIX +' jump {ICAO}');
        return;
    }
    if(!utils.isValidIcao(args[2])){
        utils.error(sender.author, 'Digite um ICAO válido');
        return;
    }
    const EventsJump = database.models.EventsJump;
    const event = await EventsJump.findAll({
        where: {
            airport: args[2].toUpperCase()
        }
    });
    let today = new Date();
    console.log("Hoje agora são " + today.getTime() + " dia " + today.getUTCDate() + " mes " + (today.getUTCMonth() + 1)  + " ano " + today.getUTCFullYear() + " hora " + today.getUTCHours() + " min " + today.getUTCMinutes() + " SEC" + today.getUTCSeconds());

    // const event = await EventsJump.create(newEvent);
    
    // let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    // const startAt = new Date(event.dataValues.startAt);
    // const endAt = new Date(event.dataValues.endAt);

    // const eventAnnouncement = new Discord.MessageEmbed()
    // .setColor('#FF5100')
    // .setTitle('NOVO EVENTO CRIADO')
    // .setDescription('Novo evento liberado na TOP Airlines')
    // .setThumbnail(client.user.displayAvatarURL())
    // .addFields(
    //     { name: 'Aeroporto', value: event.dataValues.airport },
    //     { name: 'Liberado dia: ', value: utils.formatDate(startAt), inline: true},
    //     { name: 'Encerra dia: ', value: utils.formatDate(endAt), inline: true}
    // )
    // .setTimestamp()
    // .setFooter('Copyright TOP Linhas Aéreas');
    // client.channels.fetch('709211295689211940').then(channel => {
    //     channel.send(eventAnnouncement)
    // });
    // utils.log(client, "O usuario " + sender.member.user.username + "#"+sender.member.user.discriminator + " adicionou um novo evento em " + args[2].toUpperCase());
}