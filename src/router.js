const utils = require('./utils');

const changeLogCommand = require('./Commands/changelog');
const callStaffCommand = require('./Commands/staff');
const viewPilotsCommand = require('./Commands/pilots');
const viewBidsCommand = require('./Commands/bids');
const viewSchedulesCommand = require('./Commands/schedules');
const createEventCommand = require('./Commands/createEvent');
const jumpCommand = require('./Commands/jump');
const sayCommand = require('./Commands/say');
const cleanCommand = require('./Commands/delete');
const airportCommand = require('./Commands/addAirport');

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
    },
    jump(client, args, sender) {
        return jumpCommand(client, args,sender);
    },
    falar(client, args, sender) {
        return sayCommand(client, args,sender);
    },
    apagar(client, args, sender) {
        return cleanCommand(client, args,sender);
    },
    addAirport(client, args, sender) {
        return airportCommand(client, args,sender);
    },
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