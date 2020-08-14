const utils = require('./utils');

const changeLogCommand = require('./Commands/changelog');
const callStaffCommand = require('./Commands/staff');
const viewPilotsCommand = require('./Commands/pilots');
const viewBids = require('./Commands/bids');
const viewSchedules = require('./Commands/schedules');

const routes = {
    changelog(client, args, sender) {
        return changeLogCommand(client, args, sender);
    },
    chamarstaff(client, args, sender) {
        return callStaffCommand(client, args, sender);
    },
    pilotos(client, args, sender) {
        return viewPilotsCommand(client, args, sender);
    },
    reservas(client, args, sender) {
        return viewBids(client, args, sender);
    },
    rotas(client, args, sender) {
        return viewSchedules(client, args, sender);
    }
}
module.exports = {
    execute_command(client, message) {
        const messageArgs = message.content.split(' ');
        const command = messageArgs[1];
        const execute = routes[command];

        if(execute === undefined) {
            utils.error(message.author, "Comando não encontrado!");
            return;
        }
        execute(client, messageArgs, message);
        return command;
    }
};