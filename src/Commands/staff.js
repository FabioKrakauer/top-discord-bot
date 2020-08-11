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
    client.channels.fetch('709211296092127390').then(channel => {
        channel.send('@here \n' + '**CHAMADO STAFF**' + ' \n De ' + sender.member.user.username + "#"+sender.member.user.discriminator+ '\n- _' + message + '_')
    });
    sender.author.send("Sua mensagem foi enviada! Aguarde até 72h para uma resposta, caso não respondam envie de novo.");
}