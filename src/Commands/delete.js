const utils = require('../utils');

require('dotenv').config();
module.exports = (client, args, sender) => {
    if(!sender.member._roles.includes(process.env.ADMIN_ROLE_ID)){
        utils.error(sender.author, 'Sem permissão! Infelizmente você não possui permissão para isto!');
        return;
    }
    if(args.length < 3) {
        utils.error(sender.author, 'Comando inválido! Digite ' + process.env.COMMAND_PREFIX +' limpar {quantidade}');
        return;
    }
    let quantity = parseInt(args[2]);
    quantity = quantity <= 100 ? quantity : 100;
    sender.channel.bulkDelete(quantity).then(() => {
        sender.channel.send("Deletei " + quantity + " mensagens!");
     });
    sender.delete({timeout: 1, reason: 'Automaticamente excluido pelo bot'});
}