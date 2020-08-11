const utils = require('../utils');

require('dotenv').config();
module.exports = (client, args, sender) => {
    if(!sender.member._roles.includes(process.env.ADMIN_ROLE_ID)){
        utils.error(sender.author, 'Sem permissão! Infelizmente você não possui permissão para isto!');
    }
    if(args.length < 4) {
        utils.error(sender.author, 'Comando inválido! Digite ' + process.env.COMMAND_PREFIX +' changelog {data} {mensagem}');
        return;
    }
    let message = "";
    for(let i = 3; i < args.length; i++){
        message += args[i] + " ";
    }
    client.channels.fetch('730772596110393346').then(channel => {
        channel.send('@everyone \n **' + args[2] + '** \n - _' + message + '_')
    });
    utils.log(client, "O usuario " + sender.member.user.username + "#"+sender.member.user.discriminator + " adicionou uma Change Log")
}