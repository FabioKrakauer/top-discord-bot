const changeLogCommand = require('./Commands/changelog')
const routes = {
    changelog(client, args, sender) {
        return changeLogCommand(client, args, sender)
    }
}
module.exports = {
    execute_command(client, message) {
        const messageArgs = message.content.split(' ');
        const command = messageArgs[1];
        const execute = routes[command];
        execute(client, messageArgs, message);
        return command;
    }
};