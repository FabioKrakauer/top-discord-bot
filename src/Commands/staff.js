const Discord = require('discord.js');
const utils = require('../utils');

require('dotenv').config();
module.exports = (client, args, sender) => {
    if(args.length < 3) {
        utils.error(sender.author, 'Comando inválido! Digite ' + process.env.COMMAND_PREFIX +' chamarstaff {mensagem}');
        return;
    }
    let message = "";
    for(let i = 2; i < args.length; i++){
        message += args[i] + " ";
    }
    const messageEmbeed = new Discord.MessageEmbed()
    .setColor('#FF5100')
    .setTitle('CHAMADO STAFF')
    .setThumbnail(client.user.displayAvatarURL())
    .setAuthor(sender.member.user.username + "#"+sender.member.user.discriminator, sender.member.user.avatarURL())
    .addFields(
        { name: "Chamado enviado por", value: sender.member.nickname},
        { name: '\u200B', value: '\u200B' },
        { name: "Mensagem", value: message}
    )
    .setTimestamp()
    .setFooter('Chamado de STAFF Copyright TOP Linhas Aéreas');

    client.channels.fetch('709211296092127390').then(channel => {
        channel.send("@here Novo chamado de STAFF")
        channel.send(messageEmbeed);
    });
    sender.author.send("Sua mensagem foi enviada! Aguarde até 72h para uma resposta, caso não respondam envie de novo.");
}