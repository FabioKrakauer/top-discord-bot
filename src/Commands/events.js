const utils = require('../utils');
const { Op } = require('sequelize');

const database = require('../Database');

const Discord = require('discord.js');
require('dotenv').config();
module.exports = async (client, args, sender) => {
    const today = utils.getUTCTime();
    const EventsJump = database.models.EventsJump;
    const events = await EventsJump.findAll({where: {
        startAt: {
            [Op.gte]: today
        }
    }});
    const messageEmbeed = new Discord.MessageEmbed()
    .setColor('#FF5100')
    .setTitle('PRÓXIMOS EVENTOS')
    .setDescription('PRÓXIMOS EVENTOS CRIADOS')
    .setThumbnail(client.user.displayAvatarURL());

    events.forEach(event => {
        // const sa = new Date(event.dataValues.startAt);
        // const ea = new Date(event.dataValues.endAt);
        // console.log(sa);
        // console.log(ea);
        // messageEmbeed.addFields(
        //     { name: 'Aeroporto', value: event.dataValues.airport, inline: true},
        //     { name: 'Libera dia: ', value: utils.formatDate(new Date(event.dataValues.startAt)), inline: true},
        //     { name: 'Encerra dia: ', value: utils.formatDate(new Date(event.dataValues.endAt)), inline: true}
        // )
    });
    messageEmbeed
    .setTimestamp()
    .setFooter('Copyright TOP Linhas Aéreas');
    sender.author.send(messageEmbeed);
}