const utils = require('../utils');

require('dotenv').config();
module.exports = (client, args, sender) => {
    if(!sender.member._roles.includes(process.env.ADMIN_ROLE_ID)){
        utils.error(sender.author, 'Sem permissão! Infelizmente você não possui permissão para isto!');
        return;
    }
    if(args.length < 3) {
        utils.error(sender.author, 'Comando inválido! Digite ' + process.env.COMMAND_PREFIX +' falar {mensagem}');
        return;
    }
    let message = "";
    for(let i = 2; i < args.length; i++){
        message += args[i] + " ";
    }
    sender.channel.send(message);
    sender.delete({timeout: 1, reason: 'Automaticamente excluido pelo bot'});
}