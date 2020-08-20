const utils = require('./utils');

const changeLogCommand = require('./Commands/changelog');
const callStaffCommand = require('./Commands/staff');
const viewPilotsCommand = require('./Commands/pilots');
const viewBidsCommand = require('./Commands/bids');
const viewSchedulesCommand = require('./Commands/schedules');
const createEventCommand = require('./Commands/createEvent');

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
        return viewBidsCommand(client, args, sender);
    },
    rotas(client, args, sender) {
        return viewSchedulesCommand(client, args, sender);
    },
    addEvento(client, args, sender) {
        return createEventCommand(client, args,sender);
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